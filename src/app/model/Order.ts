import {OrderItem} from "./OrderItem";

export interface Order {
  id: number;
  items: OrderItem[];
  orderDate: string; // Można użyć Date, ale dla uproszczenia używam string
  deliveryDate: string;
  totalPrice: number;
}
