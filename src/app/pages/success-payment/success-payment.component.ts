import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-success-payment',
  standalone: true,
  imports: [],
  templateUrl: './success-payment.component.html',
  styleUrl: './success-payment.component.css'
})
export class SuccessPaymentComponent {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Przekierowanie na stronę zamówień po 3 sekundach
    setTimeout(() => {
      this.router.navigate(['/orders']);
    }, 3000);
  }
}
