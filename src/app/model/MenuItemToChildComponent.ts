export interface MenuItemToChildComponent{
  name: string;
  foodAdditivePrices: { [key: string]: number };
  sizesWithPrices: { [size: string]: number };
}
