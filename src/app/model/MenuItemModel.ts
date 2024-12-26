import {SizePriceModel} from "./SizePriceModel";
import {FoodAdditivesPriceModel} from "./FoodAdditivesPriceModel";

export interface MenuItemModel {
  name: string;
  description: string;
  available: boolean;
  foodCategory: string;
  sizesWithPrices: SizePriceModel[];
  foodAdditivePrices: FoodAdditivesPriceModel[];
}
