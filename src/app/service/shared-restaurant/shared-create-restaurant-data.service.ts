import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {CreateRestaurantModel} from "../../model/CreateRestaurantModel";

@Injectable({
  providedIn: 'root'
})
export class SharedCreateRestaurantDataService {
  private restaurantDataSource = new BehaviorSubject<CreateRestaurantModel | null>(null);
  currentRestaurantData = this.restaurantDataSource.asObservable();

  constructor() {}

  changeRestaurantData(data: CreateRestaurantModel) {
    this.restaurantDataSource.next(data);
  }
}
