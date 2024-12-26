import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import * as bootstrap from 'bootstrap';
import {SharedDataService} from "../service/shared-data/shared-data.service";
import {Router} from "@angular/router";
import {CartService} from "../service/cart-service/cart.service";
import {CartItemResponse} from "../model/response/CartItemResponse";

@Component({
  selector: 'app-off-canvas-cart',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './off-canvas-cart.component.html',
  styleUrl: './off-canvas-cart.component.css'
})
export class OffCanvasCartComponent implements OnInit{


  @ViewChild('modal') modalElementRef: ElementRef;
  groupedCartItems: { restaurantName: string; items: CartItemResponse[] }[] = [];
  cartItem: CartItemResponse[] = [];
  myPrice: number;

  constructor(private sharedDataService: SharedDataService,
              private router: Router,
              private cartService: CartService) {}
  ngOnInit(): void {
    this.loadCart();
  }
  loadCart(): void {
    this.cartService.getCart().subscribe({
      next: (cartItems: CartItemResponse[]) => {
        this.cartItem = cartItems;
        console.log(cartItems);
        this.calculateTotalPrice(); // Oblicz całkowitą cenę po załadowaniu danych
        this.groupCartItems(); // Grupowanie elementów koszyka
      },
      error: (error) => {
        console.error('Error fetching cart:', error);
      }
    });
  }
  calculateTotalPrice(): void {
    this.myPrice = this.cartItem.reduce((total, item) => {
      const additivesTotal = Object.values(item.additives || {}).reduce((sum, price) => sum + price, 0);
      const itemTotalPrice = (item.price + additivesTotal) * item.quantity;

      // Dodaj cenę tego elementu do sumy całkowitej
      return total + itemTotalPrice;
    }, 0);
  }

  getFoodAdditiveArray(additives: { [key: string]: number }): { key: string; value: number }[] {
    return Object.entries(additives).map(([key, value]) => ({ key, value }));
  }

  getAdditivesPrice(additives: { [key: string]: number }): number {
    return Object.values(additives).reduce((total, price) => total + price, 0);
  }

  showModal(): void {
    setTimeout(() => {
      if (this.modalElementRef.nativeElement) {
        this.loadCart();
        const offcanvasElement = new bootstrap.Offcanvas(this.modalElementRef.nativeElement);
        offcanvasElement.show();
      }
    }, 0);

  }
  navigateToAddItem(){
    this.router.navigate(['/restaurants']);
  }
  navigateToOrderSubmit() {
    this.router.navigate(['/checkout']);
  }

  groupCartItems(): void {
    const grouped = new Map<number, { restaurantName: string; items: CartItemResponse[] }>();

    this.cartItem.forEach(item => {
      if (!grouped.has(item.restaurantId)) {
        grouped.set(item.restaurantId, {
          restaurantName: item.restaurantName,
          items: []
        });
      }
      grouped.get(item.restaurantId)?.items.push(item);
    });

    // Convert grouped Map to an array for *ngFor
    this.groupedCartItems = Array.from(grouped.values());
  }

}
