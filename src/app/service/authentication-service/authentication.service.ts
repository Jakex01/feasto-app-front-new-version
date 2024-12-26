import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RegisterRequest} from "../../model/request/RegisterRequest";
import {AuthenticationRequest} from "../../model/request/AuthenticationRequest";
import {AuthenticationResponse} from "../../model/response/AuthenticationResponse";
import {Observable} from "rxjs";
import {LocationModel} from "../../model/LocationModel";
import {VerificationRequest} from "../../model/request/VerificationRequest";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = 'http://localhost:8762/api/security/identity';

  constructor(private http: HttpClient, private router: Router) { }

  register(
    registerRequest: RegisterRequest
  ){
    return this.http.post<AuthenticationResponse>
    (`${this.baseUrl}/register`, registerRequest);
  }
  login(authRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/authenticate`, authRequest);
  }


  getCurrentlyLoggedUserRole(): Observable<String[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get<String[]>(`${this.baseUrl}/roles`, {headers});
  }

  verifyCode(verificationRequest: VerificationRequest) {
    console.log(verificationRequest);
    return this.http.post<AuthenticationResponse>
    (`${this.baseUrl}/verify`, verificationRequest);
  }
  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.http.post('/api/auth/logout', {}).subscribe({
      next: () => {
        localStorage.removeItem('token');
        localStorage.clear();
        localStorage.removeItem('menuItemOrder');
        localStorage.removeItem('selectedDateHour');

        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error during logout:', err);
        this.router.navigate(['/login']);
      }
    });
  }
}
