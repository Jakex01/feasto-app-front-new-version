import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-redirect',
  standalone: true,
  imports: [],
  templateUrl: './redirect.component.html',
  styleUrl: './redirect.component.css'
})
export class RedirectComponent {
  countdown: number = 3; // Liczba sekund do przekierowania

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.startCountdown();
  }

  private startCountdown(): void {
    const interval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--; // Zmniejsz licznik o 1 co sekundę
      } else {
        clearInterval(interval); // Zatrzymaj odliczanie
        this.redirectToPayment();
      }
    }, 1000);
  }

  private redirectToPayment(): void {

    this.router.navigate(['/orders']);
  }
}
