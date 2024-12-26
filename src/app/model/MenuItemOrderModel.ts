export interface MenuItemOrderModel{
  menuItemId: number;
  name: string;
  description: string;
  category: string;
  foodAdditivePrices: { [key: string]: number };
  selectedSize: string;
  selectedPrice: number;
  totalItemPrice: number;
  quantity: number;
}
