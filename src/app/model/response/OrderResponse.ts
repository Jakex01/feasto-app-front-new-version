import {MenuItemOrderModelResponse} from "./MenuItemOrderModelResponse";

export interface OrderResponse{
  items: MenuItemOrderModelResponse[];
  id: number;
  totalPrice: number;
  restaurantId: number;
  orderNote: string;
  orderStatus: string;
  restaurantName: string;
  deliveryFee: number;
  expectedDeliveryTimeInMinutes: number;
  createDate: Date;
}
