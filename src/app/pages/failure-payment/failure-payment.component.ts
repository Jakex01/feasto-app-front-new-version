import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-failure-payment',
  standalone: true,
  imports: [],
  templateUrl: './failure-payment.component.html',
  styleUrl: './failure-payment.component.css'
})
export class FailurePaymentComponent {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Przekierowanie na stronę zamówień po 3 sekundach
    setTimeout(() => {
      this.router.navigate(['/orders']);
    }, 3000);
  }
}
