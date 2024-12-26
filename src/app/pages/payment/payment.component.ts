import { Component } from '@angular/core';
import {PaymentService} from "../../service/payment-service/payment.service";

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  constructor(private paymentService: PaymentService) {}

  processOrder(): void {
    const orderRequest = {
      userEmail: 'customer@example.com',
      restaurantName: 'Delicious Pizza',
      orderId: 12345,
      currency: 'USD',
      amount: 5000,
    };
    this.paymentService.createPaymentSession(orderRequest).subscribe({
      next: (response: any) => {
        if (response && response.status === 'SUCCESS') {
          window.location.href = response.sessionUrl;
        }
      },
      error: (err) => {
        console.error('Payment session creation failed:', err);
        alert('Unable to create payment session.');
      },
    });
  }
}
