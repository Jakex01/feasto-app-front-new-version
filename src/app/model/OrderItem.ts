export interface OrderItem {
  foodItem: string;
  size: string;
  addOns: string[];
  price: number; // Cena jednostkowa za pozycję
  quantity: number; // Ilość danego produktu
}
