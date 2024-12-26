export interface CartItemResponse {
  menuItemId: number;
  name: string;
  category: string;
  restaurantName: string;
  restaurantId: number;
  quantity: number;
  size: string;
  price: number;
  additives: { [key: string]: number };
}
