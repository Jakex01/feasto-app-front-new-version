export interface CartItem {
  name: string;
  category: string;
  restaurantName: string;
  restaurantId: number;
  quantity: number;
  size: string;
  price: number;
  additives: { [key: string]: number };
}
