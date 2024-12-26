import {Component, OnInit} from '@angular/core';
import {AuthenticationRequest} from "../../model/request/AuthenticationRequest";
import {AuthenticationResponse} from "../../model/response/AuthenticationResponse";
import {AuthenticationService} from "../../service/authentication-service/authentication.service";
import {Router} from "@angular/router";
import {VerificationRequest} from "../../model/request/VerificationRequest";
import {animate, style, transition, trigger} from "@angular/animations";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('0.5s ease-in-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('0.3s ease-in-out', style({ opacity: 0, transform: 'translateY(20px)' })),
      ]),
    ]),
  ]
})
export class LoginPageComponent {
  authRequest: AuthenticationRequest = {};
  otpCode = '';
  authResponse: AuthenticationResponse = {};

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
  }

  authenticate() {
    this.authService.login(this.authRequest)
      .subscribe({
        next: (response) => {
          this.authResponse = response;
          if (!this.authResponse.mfaEnabled) {
            localStorage.setItem('token', response.accessToken as string);
            this.router.navigate(['main']);
          }
        }
      });
  }

  unavailableMessage = false;

  showUnavailableMessage(): void {
    this.unavailableMessage = true;

    // Ukryj komunikat po 3 sekundach
    setTimeout(() => {
      this.unavailableMessage = false;
    }, 3000);
  }

  verifyCode() {
    const verifyRequest: VerificationRequest = {
      email: this.authRequest.email,
      code: this.otpCode
    };
    this.authService.verifyCode(verifyRequest)
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.accessToken as string);
          this.router.navigate(['main']);
        }
      });
  }


}
