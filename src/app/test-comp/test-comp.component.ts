import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { CustomMenuItemResponse } from "../model/response/CustomMenuItemResponse";
import { MenuItemOrderModel } from "../model/MenuItemOrderModel";
import { SharedDataService } from "../service/shared-data/shared-data.service";
import {CartItem} from "../model/CartItem";
import {Cart} from "../model/Cart";
import {CartService} from "../service/cart-service/cart.service";

@Component({
  selector: 'app-test-comp',
  templateUrl: './test-comp.component.html',
  styleUrls: ['./test-comp.component.css']
})
export class TestCompComponent implements OnInit {

  @ViewChild('modal') modal: ElementRef;
  @Output() sendOrderToParent: EventEmitter<MenuItemOrderModel> = new EventEmitter();

  customMenuItem: CustomMenuItemResponse;
  selectedSizeKey: string;
  cartItem: CartItem = {
    name: '',
    category: '',
    restaurantName: '',
    restaurantId: 0,
    quantity: 1,
    size: '',
    price: 0,
    additives: {},
  };

  cartItemBasic: CartItem = {
  name: '',
  category: '',
  restaurantName: '',
    restaurantId: 0,
  quantity: 1,
  size: 'Small',
  price: 0,
  additives: {},
}
  cart: Cart = {
    menuItemId: 0,
    cartItem: this.cartItem
  }

  restaurantId: number = 0;
  showModal1 = false;
  restaurantName: string = '';
  selectedAdditives: { [key: string]: boolean } = {};

  constructor(private sharedDataService: SharedDataService,
              private cartService: CartService) {}

  ngOnInit(): void {
    this.restaurantId = parseInt(localStorage.getItem('restaurantId') || '0', 10);
    this.restaurantName = localStorage.getItem('restaurantName') || 'empty';
  }

  updateSelectedSize(sizeKey: string): void {
    const selectedSize = this.customMenuItem.sizesWithPrices.find(size => size.size === sizeKey);
    if (selectedSize) {
      this.cartItem.size = selectedSize.size;
      this.cartItem.price = selectedSize.price;
    }
  }

  calculateTotalPrice(): number {
    let total = this.customMenuItem.sizesWithPrices.find(size => size.size === this.cartItem.size)?.price || 0;
    this.customMenuItem.foodAdditivePrices.forEach(additive => {
      if (this.selectedAdditives[additive.foodAdditive]) {
        total += additive.price;
        this.cartItem.additives[additive.foodAdditive] = additive.price;
      } else {
        delete this.cartItem.additives[additive.foodAdditive];
      }
    });
    total *= this.cartItem.quantity;
    this.cartItem.price = total;

    return total;
  }



  showModal(): void {
    this.showModal1 = true;
  }

  closeModal(): void {
    this.showModal1 = false;
  }

  sendOrder(): void {
    this.cartItem.name = this.customMenuItem.name;
    this.cartItem.restaurantName = this.restaurantName;
    this.cartItem.category = this.customMenuItem.category;
    this.cartItem.size = this.selectedSizeKey;
    this.cartItem.price = this.calculateTotalPrice();
    this.cart.cartItem = this.cartItem;
    this.cart.menuItemId = this.customMenuItem.menuItemId;
    this.cart.cartItem.restaurantId = this.restaurantId;
    this.cartService.postCart(this.cart).subscribe({
      next: response => {
        this.cart.menuItemId = 0;
        this.cartItem = { ...this.cartItemBasic };
      },
      error: error => console.error('Błąd podczas wysyłania koszyka:', error)
    });
    this.closeModal();
  }
}
