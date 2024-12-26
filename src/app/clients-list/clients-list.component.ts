import {Component, OnInit} from '@angular/core';
import {OrderService} from "../service/order-service/order.service";
import {CustomerResponse} from "../model/response/CustomerResponse";
import {RestaurantService} from "../service/restaurant-service/restaurant.service";
import {RestaurantDataShorten} from "../model/response/RestaurantDataShorten";
@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit{
  selectedRestaurantId: number | null = null;
  errorMessage: string | null = null;
  constructor(private orderService: OrderService,
              private restaurantService: RestaurantService) {
  }
  customersList: CustomerResponse[];
  restaurantsList: RestaurantDataShorten[];

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants() {
    this.restaurantService.getUsersRestaurants().subscribe({
      next: (data) => {
        this.restaurantsList = data;
      },
      error: (error) => {
        console.error('Error fetching customers:', error);
      }
    });
  }

  loadCustomers(): void {
    if (!this.selectedRestaurantId) {
      this.errorMessage = 'Please select a restaurant.';
      this.customersList = [];
      return;
    }

    this.orderService.getRestaurantCustomers(this.selectedRestaurantId).subscribe({
      next: (data) => {
        this.customersList = data;
        this.errorMessage = null;
      },
      error: (error) => {
        console.error('Error fetching customers:', error);
        this.errorMessage = 'Failed to load customers.';
      }
    });
  }

  onRestaurantSelectionChange() {
    console.log("hello");
    this.loadCustomers();
  }
}
