import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {OrderService} from "../../service/order-service/order.service";
import {OrderResponse} from "../../model/response/OrderResponse";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {ReviewModel} from "../../model/ReviewModel";
import {OrderRequest} from "../../model/request/OrderRequest";
import {PostRatingRequest} from "../../model/request/PostRatingRequest";
import {RatingService} from "../../service/rating-service/rating.service";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
  animations: [
    trigger('fadeSlideInOut', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-50%)' }),
        animate('300ms ease-out')
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0, transform: 'translateX(50%)' }))
      ])
    ])
  ]
})
export class OrdersComponent implements OnInit{
  selectedTab = 'history';
  statusProgressMap: { [key: string]: number } = {
    'PENDING': 10,
    'ACCEPTED': 20,
    'IN_PREPARATION': 50,
    'READY_FOR_PICKUP': 80,
    'OUT_FOR_DELIVERY': 80,
    'DELIVERED': 100
  };
  review:ReviewModel;
  paymentStatus: string ="PAYMENT_SUCCESSFUL";
  getOrderProgress(status: string): number {
    return this.statusProgressMap[status] || 0;
  }
  postRatingRequest: PostRatingRequest = {
    restaurantId: 0,
    review: '',
    rating: 0
  }
  orderRequest : OrderResponse[];
  constructor(private orderService: OrderService,
              private ratingService: RatingService) {
    this.review = {
      rating: 0,
      comment: ''
    };
  }

  saveReview() {
    this.ratingService.postRestaurantReview(this.postRatingRequest).subscribe(
      response => {
        console.log('Review successfully posted:', response);
      },
      error => {
        console.error('Error posting review:', error);
      }
    );
  }
  ngOnInit(): void {
    this.fetchOrders();
  }
  fetchOrders(): void {
    if (this.selectedTab === 'history') {
      this.orderService.getOrdersHistoric().subscribe({
        next: (orders: OrderResponse[]) => {
          this.orderRequest = orders;
          console.log("Order history fetched successfully:", this.orderRequest);
        },
        error: (error) => {
          console.error("Error fetching order history:", error);
        }
      });
    } else if (this.selectedTab === 'current') {
      this.orderService.getOrdersCurrent().subscribe({
        next: (orders: OrderResponse[]) => {
          this.orderRequest = orders;
          console.log("Current orders fetched successfully:", this.orderRequest);
        },
        error: (error) => {
          console.error("Error fetching current orders:", error);
        }
      });
    }
  }

  getAdditives(additivePrices: { [key: string]: number }): string {
    const additives = Object.keys(additivePrices);
    return additives.length > 0 ? additives.join(', ') : 'None';
  }
  selectTab(tab: string): void {
    this.selectedTab = tab;
    this.fetchOrders(); // Fetch data for the selected tab
  }

  generateMyOrderPdf(order: OrderResponse): void {
    this.orderService.generateOrderPdf(order).subscribe(pdfData => {
      const blob = new Blob([pdfData], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
    }, error => {
      console.error('Error generating PDF:', error);
    });
  }
  startNewChat(order: OrderResponse): void {
    const restaurantId = order.restaurantId;
    if (restaurantId) {
      window.location.href = `/messages/${restaurantId}`;
    } else {
      console.error("Restaurant ID is missing for this order");
    }
  }

  sendRestaurantDetail(restaurantId: number) {
    console.log(restaurantId);
    this.postRatingRequest.restaurantId = restaurantId;
  }
}
