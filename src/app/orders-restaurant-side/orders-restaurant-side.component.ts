import {Component, OnInit} from '@angular/core';
import {ChatModalComponent} from "../chat-modal/chat-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {OrderService} from "../service/order-service/order.service";
import {OrderResponse} from "../model/response/OrderResponse";
import {RestaurantService} from "../service/restaurant-service/restaurant.service";
import {RestaurantDataShorten} from "../model/response/RestaurantDataShorten";
import {ChatWebsocketService} from "../service/chat-websocket/chat-websocket.service";
import {concat, of, Subscription} from "rxjs";
import {catchError, map} from "rxjs/operators";


@Component({
  selector: 'app-orders-restaurant-side',
  templateUrl: './orders-restaurant-side.component.html',
  styleUrls: ['./orders-restaurant-side.component.css']
})
export class OrdersRestaurantSideComponent implements OnInit {

  orderResponses: OrderResponse[];
  selectedRestaurantId: number;
  errorMessage: string | null = null;
  restaurantsList: RestaurantDataShorten[];
  private activeSubscription?: Subscription;
  messages: { [restaurantId: number]: any[] } = {};
  orderStatuses: string[] = [
    'PENDING',
    'ACCEPTED',
    'IN_PREPARATION',
    'READY_FOR_PICKUP',
    'OUT_FOR_DELIVERY',
    'DELIVERED',
    'CANCELLED',
    'FAILED',
    'REFUNDED',
  ];

  ngOnInit(): void {
    this.loadRestaurants();
    this.fetchAllOrders();
  }

  constructor(private dialog: MatDialog,
              private orderService: OrderService,
              private restaurantService: RestaurantService,
              private chatService: ChatWebsocketService) {
  }

  openChatModal(order: OrderResponse): void {
    this.dialog.open(ChatModalComponent, {
      width: '500px',
      data: {order: order},
    });
  }


  updateOrderStatus(orderId: number, newStatus: string): void {
    this.orderService.updateOrderStatus(orderId, newStatus).subscribe({
      next: () => {
        console.log(`Order #${orderId} status updated to ${newStatus}`);
        const order = this.orderResponses.find((o) => o.id === orderId);
        if (order) {
          order.orderStatus = newStatus;
        }
      },
      error: (err) => {
        console.error('Failed to update order status', err);
      },
    });
  }

  getStatusColor(status: string): string {
    const statusColors: { [key: string]: string } = {
      PENDING: 'warn',
      ACCEPTED: 'primary',
      IN_PREPARATION: 'accent',
      READY_FOR_PICKUP: 'accent',
      OUT_FOR_DELIVERY: 'primary',
      DELIVERED: 'primary',
      CANCELLED: 'warn',
      FAILED: 'warn',
      REFUNDED: 'accent',
    };

    return statusColors[status] || 'primary';
  }
  fetchAllOrders(): void {
    this.orderService.getRestaurantOrders(this.selectedRestaurantId).subscribe({
      next: (orders) => {
        this.orderResponses = orders;
        this.errorMessage = null;
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
        this.errorMessage = 'Failed to fetch orders.';
      },
    });
  }


  fetchRestaurantOrders(): void {
    this.orderService.getRestaurantOrders(this.selectedRestaurantId).subscribe({
      next: (orders) => {
        this.orderResponses = orders;
        this.errorMessage = null;
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
        this.errorMessage = 'Failed to fetch orders.';
      },
    });
  }

  loadRestaurants() {
    this.restaurantService.getUsersRestaurants().subscribe({
      next: (data) => {
        this.restaurantsList = data;
      },
      error: (error) => {
        console.error('Error fetching customers:', error);
      }
    });
  }

  calculateTotalQuantity(items: any[]): number {
    return items.reduce((total, item) => total + item.quantity, 0);
  }

}
