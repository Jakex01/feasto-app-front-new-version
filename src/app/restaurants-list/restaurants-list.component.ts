import {Component, OnInit} from '@angular/core';
import {RestaurantService} from "../service/restaurant-service/restaurant.service";
import {RestaurantDtoModel} from "../model/RestaurantDtoModel";
import {FilterConfig} from "../shared/filter-panel/filter-panel.component";
import {FilterService} from "../service/shared/filter.service";
import {debounceTime, distinctUntilChanged, map, reduce, Subject, switchMap, tap} from 'rxjs';
import {FilterOption} from "../model/request/FilterOption";

interface SearchData {
  filters: FilterOption;
}

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.css']
})

export class RestaurantsListComponent implements OnInit{

  mappedFilter: FilterOption = {
    restaurantName: "",
    foodType: "",
    rating: 0,
    priceRange: 0,
    onlyLiked: false,
    sort: ""
  };
  restaurantName: string = "";
  numberOfResults: number;
  filterOptions: FilterConfig[];
  pageSize = 10;
  pageIndex = 0;
  totalElements = 0;
  restaurants: RestaurantDtoModel[] = [];
  private searchTerms = new Subject<SearchData>();

  constructor(private restaurantService: RestaurantService,
              private filterService: FilterService) {
  }
  ngOnInit(): void {
    this.loadRestaurants();
    this.filterOptions = this.filterService.getFilterOptions();

    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
      switchMap(({ filters }) => {
        if (this.shouldLoadAllRestaurants(filters)) {
          return this.restaurantService.getAllRestaurants(this.pageIndex, this.pageSize);
        } else {
          console.log('Searching for restaurants with filters');
          return this.restaurantService.searchRestaurantsByName(filters, this.pageIndex, this.pageSize);

        }
      }),
      map(response => {
        this.totalElements = response.totalElements;
        return response;
      })
    ).subscribe(data => {
      this.restaurants = data.content;
      console.log('Final data set to restaurants: ', data);
    });
  }
  search(term: string): void {
    this.mappedFilter = {...this.mappedFilter, restaurantName: term};
    this.searchTerms.next({
      filters: {...this.mappedFilter}
    });
  }
  handleFilterChanges(filters: { [key: string]: any }): void {
    this.mappedFilter = {
      restaurantName: this.mappedFilter.restaurantName || '',
      foodType: filters['foodType'] || '',
      rating: filters['rating'] || 0,
      priceRange: filters['priceRange'] || '',
      sort: filters['sort'] || '',
      onlyLiked:filters['onlyLiked'] || false,
    };
    console.log(this.mappedFilter.onlyLiked);
    this.searchTerms.next({
      filters: {...this.mappedFilter}
    });
  }
  loadRestaurants(): void {
    this.restaurantService.getAllRestaurants(this.pageIndex, this.pageSize)
      .subscribe({
        next: (response) => {
          this.restaurants = response.content;
          this.totalElements = response.totalElements;
          console.log("Restaurants loaded:", this.restaurants);
        },
        error: (error) => console.error('Failed to load restaurants', error)
      });
  }
  onPageChange(event: any): void {
    console.log("Page change event:", event);
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadRestaurants();
  }

  onResetFiltersClick(): void {
    this.filterService.resetFilters();
  }
  private shouldLoadAllRestaurants(filters: FilterOption): boolean {
    return !filters.restaurantName && !filters.foodType && filters.rating === 0 && filters.priceRange === 0;
  }
}
