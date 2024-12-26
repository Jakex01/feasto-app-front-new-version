import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RestaurantService} from "../service/restaurant-service/restaurant.service";
import {RestaurantResponse} from "../model/response/RestaurantResponse";
import {ActivatedRoute} from "@angular/router";
import {RatingService} from "../service/rating-service/rating.service";
import {MenuItemResponse} from "../model/response/MenuItemResponse";
import {MenuItemService} from "../service/menu-item/menu-item.service";
import {TestCompComponent} from "../test-comp/test-comp.component";
import {UserLikeRestaurantResponse} from "../model/response/UserLikeRestaurantResponse";
import {RestaurantDescAndIdModel} from "../model/RestaurantDescAndIdModel";
@Component({
  selector: 'app-restaurant-page',
  templateUrl: './restaurant-page.component.html',
  styleUrls: ['./restaurant-page.component.css'],
})
export class RestaurantPageComponent implements OnInit{
    @ViewChild('nextSection') nextSection: ElementRef;
    @ViewChild(TestCompComponent) child!: TestCompComponent;

  passDataToChild(menuItemId: number): void {
    this.fetchCustomMenuItemResponse(menuItemId);
    this.child.showModal();

  }
  restaurantDataShared: RestaurantDescAndIdModel = {
    restaurantId: 0,
    description: '',
    commentsCount: 0,
    rating: 0
  }
    heartStates: boolean[] = [false, false, false];
   restaurant: RestaurantResponse = {
    restaurantId: 0,
    name: '',
    description: '',
    phoneNumber: '',
    openingHours: '',
    rating: 0,
    foodType: '',
    image: '',
    createDate: '',
    locations: [],
    menuItems: [],
    commentsCount: 0
  };
    id: number;
    uniqueFoodCategoriesSet = new Set<String>();
    foodListByCategory: MenuItemResponse[] = [];
    userLikeRestaurantResponse: UserLikeRestaurantResponse[] = [];
  isRestaurantLiked: boolean = false;
  constructor(private restaurantService: RestaurantService,
              private route: ActivatedRoute,
              private ratingService: RatingService,
              private menuItemService: MenuItemService,
              ) {
  }
  ngOnInit(): void {

    this.id = +this.route.snapshot.paramMap.get('id')!;
    localStorage.setItem('restaurantId', String(this.id));
    this.restaurantService.getUserLikeRestaurants().subscribe({
      next: (response)=>{
        this.userLikeRestaurantResponse = response;
        this.checkIfRestaurantIsLiked();
      },
        error: (error) => {
        console.error('Error fetching restaurants:', error);
      },
    });
    this.restaurantService.getRestaurantById(this.id).subscribe({
      next: (response: RestaurantResponse) => {
        this.restaurant = response;
        localStorage.setItem('restaurantName', String(this.restaurant.name));
        this.restaurantDataShared.restaurantId = this.restaurant.restaurantId;
        this.restaurantDataShared.description = this.restaurant.description;
        this.restaurantDataShared.rating = this.restaurant.rating;
        this.restaurantDataShared.commentsCount = this.restaurant.commentsCount;
        this.selectFoodCategories();
        // this.orderRequest.restaurantId = this.id;
      },
      error: (error) => {
        console.error('Error fetching restaurants:', error);
      },
    });
  }
  checkIfRestaurantIsLiked() {
    this.userLikeRestaurantResponse.forEach((res) => {
      console.log("jedno: "+res.restaurantId);
    })

    this.isRestaurantLiked = this.userLikeRestaurantResponse.some(
      (res) => res.restaurantId === this.id
    );
    console.log('Is restaurant liked:', this.isRestaurantLiked);
  }
  selectFoodCategories() {
    this.restaurant.menuItems.forEach((menuItem: MenuItemResponse)=>{
      if(!this.uniqueFoodCategoriesSet.has(menuItem.foodCategory)){
        this.uniqueFoodCategoriesSet.add(menuItem.foodCategory);
      }
    })

  }
  selectFoodCategory(category: String) {

    if(this.restaurant){
      this.foodListByCategory = [];
      this.restaurant.menuItems.forEach((menuItem: MenuItemResponse)=>{
        if(menuItem.foodCategory.toLowerCase() === category.toLowerCase()){
          this.foodListByCategory.push(menuItem);
        }
      })
    }
  }
  toggleHeart(index: number): void {
    this.heartStates[index] = !this.heartStates[index];
    this.triggerAnimation(index);

    if (!this.isRestaurantLiked) {
      this.restaurantService.putLikeRestaurant(this.id).subscribe({
        next: (response) => {
          console.log('Restaurant liked successfully', response);

        },
        error: (error) => {
          console.error('Error liking the restaurant', error);
          this.heartStates[index] = !this.heartStates[index];
        }
      });
      this.isRestaurantLiked = true;
    } else {
      this.restaurantService.deleteLikeRestaurant(this.id).subscribe({
        next: (response) => {
          console.log('Restaurant unliked successfully', response);
        },
        error: (error) => {
          console.error('Error unliking the restaurant', error);
          this.heartStates[index] = !this.heartStates[index];
        }
      });
      this.isRestaurantLiked = false;
    }
  }
  triggerAnimation(index: number): void {
    const element = document.querySelector('.heart-button i');
    if (element) {
      element.classList.add('heart-pop');
      setTimeout(() => element.classList.remove('heart-pop'), 400);
    }
  }
  scrollToNextSection() {
    window.scrollBy({
      top: window.innerHeight,
      left: 0,
      behavior: 'smooth'
    });
  }
  fetchCustomMenuItemResponse(menuItemId: number){
    this.menuItemService.getCustomMenuItem(menuItemId)
      .subscribe({
        next:(menuItem)=>{
          this.child.customMenuItem = menuItem;
          console.log(menuItem);
        },
        error:(err)=>{
          console.error('Failed to load menu item:', err);
        }
      })
  }
}
