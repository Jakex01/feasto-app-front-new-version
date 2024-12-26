import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {PaymentService} from "../service/payment-service/payment.service";
import {PaymentRequest} from "../model/request/PaymentRequest";
import {SharedDataService} from "../service/shared-data/shared-data.service";
import {OrderRequest} from "../model/request/OrderRequest";
import {LocationService} from "../service/location-service/location.service";
import {OrderService} from "../service/order-service/order.service";
import {AuthenticationService} from "../service/authentication-service/authentication.service";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader, MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCard, MatCardTitle} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {ShortenUserLocationModel} from "../model/ShortenUserLocationModel";
import {CartService} from "../service/cart-service/cart.service";
import {CartItemResponse} from "../model/response/CartItemResponse";
import {MatIcon} from "@angular/material/icon";
import {OrderLocationRequest} from "../model/request/OrderLocationRequest";
import {map} from "rxjs/operators";
import {LocationModel} from "../model/LocationModel";
@Component({
  selector: 'app-order-checkout-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MatAccordion, MatButton, MatCard, MatCardTitle, MatDivider, MatExpansionPanel, MatExpansionPanelDescription, MatExpansionPanelHeader, MatExpansionPanelTitle, MatFormField, MatLabel, MatOption, MatSelect, MatIcon, MatIconButton],
  templateUrl: './order-checkout-page.component.html',
  styleUrl: './order-checkout-page.component.css'
})
export class OrderCheckoutPageComponent implements OnInit{
  myPrice: number;
  selectedLocationId: number | null = null;
  cartItem: CartItemResponse[] = [];
  restaurantNames: string[] = [];
  paymentRequest: PaymentRequest = new PaymentRequest();
  selectedPaymentMethod: string = '';
  selectedDeliveryType: string = '';
  selectedTip: number = 0;
  selectedCurrency: string = 'USD';
  userLocationOrder: LocationModel[];
  selectDeliveryType(type: string) {
    this.selectedDeliveryType = type;
  }
  constructor(private paymentService: PaymentService,
              private sharedDataService: SharedDataService,
              private locationService: LocationService,
              private orderService: OrderService,
              private authenticationService: AuthenticationService,
              private cartService: CartService
              ) {
  }

  userLocation: ShortenUserLocationModel[] = [];
  ngOnInit(): void {
    this.loadCart();
    this.fetchUserLocation();
    }

    userId: number;
  fetchUserLocation(): void {
    this.locationService.getShortenLocation().subscribe(
      (data: ShortenUserLocationModel[]) => {
        this.userLocation = data;
        this.userLocation.forEach(user => console.log(user.id + '' + user.locationName));
      },
      (error) => {
        console.error('Error fetching location:', error);
      }
    );
  }

  removeItem(menuItemId: number): void {
    this.cartItem = this.cartItem.filter(item => item.menuItemId !== menuItemId);
    this.calculateTotalPrice();
    this.cartService.removeItem(menuItemId).subscribe({
      next: () => console.log(`Item with ID ${menuItemId} removed successfully`),
      error: (error) => console.error(`Error removing item with ID ${menuItemId}:`, error)
    });
  }

  loadCart(): void {
    this.cartService.getCart().subscribe({
      next: (cartItems: CartItemResponse[]) => {
        this.cartItem = cartItems;
        this.extractRestaurantNames();
        this.calculateTotalPrice();
      },
      error: (error) => {
        console.error('Error fetching cart:', error);
      }
    });
  }
  extractRestaurantNames(): void {
    const uniqueNames = new Set<string>();
    this.cartItem.forEach((item) => uniqueNames.add(item.restaurantName));
    this.restaurantNames = Array.from(uniqueNames); // Convert Set to Array
  }
  calculateTotalPrice() {
    this.myPrice = this.cartItem.reduce((total, item) => {
      const additivePrice = Object.values(item.additives).reduce((sum, price) => sum + price, 0);
      return total + ((item.price+additivePrice) * item.quantity);
    }, 0);
  }

  placeOrder() {
    this.loadCart();
    const groupedItems: { [restaurantId: number]: CartItemResponse[] } = this.cartItem.reduce(
      (acc: { [key: number]: CartItemResponse[] }, item: CartItemResponse) => {
        if (!acc[item.restaurantId]) {
          acc[item.restaurantId] = [];
        }
        acc[item.restaurantId].push(item);
        return acc;
      },
      {} as { [key: number]: CartItemResponse[] }
    );
    for (const [restaurantId, items] of Object.entries(groupedItems)) {
      let totalPrice = items.reduce((sum, item) => {
        const additivesTotal = Object.values(item.additives).reduce((addSum, additivePrice) => addSum + additivePrice, 0);
        return sum + (item.price + additivesTotal) * item.quantity;
      }, 0);
      if(this.selectedTip != 0) {
        totalPrice = totalPrice + (totalPrice * this.selectedTip);
      }
      const orderRequest: OrderRequest = {
        items: items.map(item => ({
          menuItemId: item.menuItemId,
          name: item.name,
          description: '',
          category: item.category,
          foodAdditivePrices: item.additives,
          selectedSize: item.size,
          selectedPrice: item.price,
          totalItemPrice: (item.price + Object.values(item.additives).reduce((addSum, additivePrice) => addSum + additivePrice, 0)) * item.quantity,
          quantity: item.quantity,
        })),
        totalPrice: totalPrice,
        deliveryOption: this.selectedDeliveryType,
        restaurantId: parseInt(restaurantId),
        restaurantName: items[0].restaurantName,
        orderNote: '',
        tip: totalPrice * this.selectedTip,
        deliveryFee: this.selectedDeliveryType === 'Delivery' ? 5 : 0,
      };
      let orderLocationRequest: OrderLocationRequest = {
        city: '',
        street: '',
        streetNumber: '',
        country: '',
        postalCode: ''
      };
      if(this.isDelivery()) {

        this.locationService.getAllLocationsByUser()
          .pipe(
            map(locations => locations
              .filter(location => location.id === this.selectedLocationId))
          )
          .subscribe({
            next: (filteredLocations) => {
              if (filteredLocations.length > 0) {
                this.userLocationOrder = filteredLocations;
              } else {
                console.log('No matching locations found');
              }
            },
            error: (err) => {
              console.error('Error fetching locations:', err);
            }
          });

        orderLocationRequest = {
          city: this.userLocationOrder[0].city,
          street: this.userLocationOrder[0].street,
          streetNumber: this.userLocationOrder[0].streetNumber,
          country: this.userLocationOrder[0].country,
          postalCode: this.userLocationOrder[0].postalCode,
        }
      }
      this.orderService.postOrder(orderRequest, orderLocationRequest).subscribe({
        next: () => {
          this.deleteCart();
          this.paymentRequest.amount = orderRequest.totalPrice;
          this.paymentRequest.currency = this.selectedCurrency;
          this.paymentRequest.orderId = orderRequest.restaurantId;
          this.paymentRequest.restaurantName = orderRequest.restaurantName;
          this.paymentRequest.userEmail = '';
          this.paymentService.createPaymentSession(this.paymentRequest)
          if(this.selectedPaymentMethod) {
            console.log(this.paymentRequest);
            this.paymentService.createPaymentSession(this.paymentRequest).subscribe({
              next: (response) => {
                console.log('Payment session created:', response);
                if (response && response.sessionUrl) {
                  window.location.href = response.sessionUrl;
                } else {
                  console.error('Invalid response from payment service:', response);
                }
              },
              error: (err) => {
                console.error('Error creating payment session:', err);
              }
            });
          } else {
            this.cartService.deleteCart();
            window.location.href = "http://localhost:4200/payment-success";
          }

        },
        error: (error) => {
          console.error(`Błąd podczas wysyłania zamówienia dla restauracji ${orderRequest.restaurantName}:`, error);
        },
      });
    }
  }


  deleteCart(): void {
    this.cartService.deleteCart().subscribe({
      next: () => {
        console.log('Cart deleted successfully');
      },
      error: (err) => {
        console.error('Error deleting cart:', err);
      }
    });
  }

  protected readonly Object = Object;
  onPaymentMethodChange(method: string): void {
    this.selectedPaymentMethod = method;
  }

  onTipChange(value: number) {
    this.selectedTip = value / 100;
  }
  isDelivery() {
    return this.selectedDeliveryType === "DELIVERY";
  }

  onLocationSelect(locationId: number): void {
    const selectedLocation = this.userLocation.find(location => location.id === locationId);
    if (selectedLocation) {
      console.log('Selected location:', selectedLocation);
    } else {
      console.warn('No matching location found for ID:', locationId);
    }
    this.selectedLocationId = locationId;
  }
}
