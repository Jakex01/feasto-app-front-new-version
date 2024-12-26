import {Component} from '@angular/core';
import {RestaurantInfoModel} from "../model/RestaurantInfoModel";
import {CreateRestaurantModel} from "../model/CreateRestaurantModel";
import {MenuItemModel} from "../model/MenuItemModel";
import {Subscription} from "rxjs";
import {LocationRestaurantModel} from "../model/LocationRestaurantModel";

@Component({
  selector: 'app-create-restaurant',
  templateUrl: './create-restaurant.component.html',
  styleUrls: ['./create-restaurant.component.css']
})
export class CreateRestaurantComponent {
  selectedImage: string | ArrayBuffer | null = null;
  isRestaurantFormVisible: boolean = true;
  isLocationFormVisible: boolean = false;
  isMenuItemFormVisible: boolean = false;
  submitRestaurantPageVisible: boolean = false;
  private RestaurantMenuItems: MenuItemModel[] = [];
  private subscription: Subscription;

  constructor() {
  }

  restaurantInfo: RestaurantInfoModel = {
    name: '',
    description: '',
    foodType: '',
    phoneNumber: '',
    openingHours: ''
  };
  locationInfo: LocationRestaurantModel = {
    city: '',
    street: '',
    streetNumber: '',
    country: '',
    postalCode: '',
    current: false
  }

  restaurantData: CreateRestaurantModel = {
    restaurantInfo: this.restaurantInfo,
    restaurantLocation: this.locationInfo,
    restaurantMenuItems: this.RestaurantMenuItems
  };

  handleRestaurantFormSubmit(data: RestaurantInfoModel) {
    this.restaurantInfo = data;
    this.isLocationFormVisible = true;
    this.isRestaurantFormVisible = false;
    this.updateRestaurantData();
  }
  handleLocationFormSubmit(data: LocationRestaurantModel) {
    this.locationInfo = data;
    this.isLocationFormVisible = false;
    this.isMenuItemFormVisible = true;
    this.updateRestaurantData();
  }
  handleMenuItemsFormSubmit(data: MenuItemModel) {
    this.RestaurantMenuItems.push(data);
    this.updateRestaurantData();
    console.log(this.restaurantData);
  }
  handleBackToRestaurantInfo() {
    this.isRestaurantFormVisible = true;
    this.isLocationFormVisible = false;
    this.isMenuItemFormVisible = false;
  }
  handleMenuItemsFinished(event: boolean) {
    this.updateRestaurantData();
    this.isMenuItemFormVisible = false;
    this.submitRestaurantPageVisible = true;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  private updateRestaurantData() {
    console.log(this.selectedImage);
    this.restaurantData = {
      restaurantInfo: this.restaurantInfo,
      restaurantLocation: this.locationInfo,
      restaurantMenuItems: this.RestaurantMenuItems
    };
  }

  handleImageSelected(image: string | ArrayBuffer | null): void {
    this.selectedImage = image; // Save the image to the variable
    if (image) {
      console.log('Image saved successfully:', image);
    } else {
      console.log('No valid image selected.');
    }
  }
}
