import {MenuItemOrderModel} from "../MenuItemOrderModel";

export interface OrderRequest{
  items: MenuItemOrderModel[];
  totalPrice: number;
  deliveryOption: string;
  restaurantId: number;
  restaurantName: string;
  orderNote: string;
  tip: number;
  deliveryFee: number;
}
