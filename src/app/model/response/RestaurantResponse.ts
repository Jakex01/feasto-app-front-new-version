import {LocationResponse} from "./LocationResponse";
import {MenuItemResponse} from "./MenuItemResponse";

export interface RestaurantResponse {
  restaurantId: number;
  name: string;
  description: string;
  phoneNumber: string;
  openingHours: string;
  rating: number;
  foodType: string;
  image: string;
  createDate: string;
  locations: LocationResponse[];
  menuItems: MenuItemResponse[];
  commentsCount: number
}
