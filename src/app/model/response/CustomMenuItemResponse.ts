import {SizePriceModel} from "../SizePriceModel";
import {FoodAdditivesPriceModel} from "../FoodAdditivesPriceModel";

export interface CustomMenuItemResponse {
  menuItemId: number;
  name: string;
  description: string;
  available: boolean;
  category: string;
  foodAdditivePrices: FoodAdditivesPriceModel[];
  sizesWithPrices: SizePriceModel[];
}
