export interface MenuItemOrderModelResponse{
  menuItemId: number;
  name: string;
  foodAdditivePrices: { [key: string]: number };
  selectedSize: string;
  selectedPrice: number;
  totalItemPrice: number;
  quantity: number;
  note: string;
}
