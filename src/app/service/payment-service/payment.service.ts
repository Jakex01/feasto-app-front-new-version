import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {PaymentRequest} from "../../model/request/PaymentRequest";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private paymentApiUrl = 'http://localhost:8762/api/payment'; // Adjust if your backend URL is different

  constructor(private http: HttpClient) { }
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  createPaymentSession(paymentEvent: PaymentRequest): Observable<any> {
    return this.http.post(`${this.paymentApiUrl}/checkout`, paymentEvent, {headers: this.getHeaders()});
  }
}
