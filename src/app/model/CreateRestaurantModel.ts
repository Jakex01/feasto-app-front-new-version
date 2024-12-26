import {RestaurantInfoModel} from "./RestaurantInfoModel";
import {MenuItemModel} from "./MenuItemModel";
import {LocationRestaurantModel} from "./LocationRestaurantModel";

export interface CreateRestaurantModel {
  restaurantInfo: RestaurantInfoModel;
  restaurantLocation: LocationRestaurantModel;
  restaurantMenuItems: MenuItemModel[]
}
