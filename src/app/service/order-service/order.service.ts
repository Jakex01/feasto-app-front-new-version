import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import { v4 as uuidv4 } from 'uuid';
import {OrderRequest} from "../../model/request/OrderRequest";
import {OrderResponse} from "../../model/response/OrderResponse";
import {OrderLocationRequest} from "../../model/request/OrderLocationRequest";
import {CustomerResponse} from "../../model/response/CustomerResponse";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'http://localhost:8762/api/order';

  constructor(private http: HttpClient) { }

  updateOrderStatus(orderId: number, orderStatus: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
  console.log(orderStatus, orderId);
    const payload = {
      orderId,
      orderStatus,
    };

    return this.http.patch(`${this.baseUrl}`, payload, { headers });
  }

  postOrder(orderRequest: OrderRequest, orderLocation: OrderLocationRequest): Observable<any> {
    const idempotencyKey = uuidv4();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Idempotency-Key': idempotencyKey
    });
    const requestBody = { orderRequest, orderLocationRequest: orderLocation };
    console.log(requestBody);
    return this.http.post<any>(this.baseUrl, requestBody, { headers });
  }
  getOrdersCurrent(): Observable<OrderResponse[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get<OrderResponse[]>(`${this.baseUrl}/current/user`, {headers});
  }
  getOrdersHistoric(): Observable<OrderResponse[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get<OrderResponse[]>(`${this.baseUrl}/archived/user`, {headers});
  }
  generateOrderPdf(orderRequest: OrderResponse): Observable<Blob> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
      'Accept': 'application/pdf'
    });

    return this.http.post(`${this.baseUrl}/pdf`, orderRequest, {
      headers: headers,
      responseType: 'blob'
    });
  }
  getAllOrdersByUser(): Observable<{ [restaurantName: string]: number }> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not available');
    }
    return this.http.get<{ [restaurantName: string]: number }>(`${this.baseUrl}/restaurants`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  getRestaurantCustomers(restaurantId: number): Observable<CustomerResponse[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
    console.log("hello: " + restaurantId);
    return this.http.get<CustomerResponse[]>(`${this.baseUrl}/restaurants-clients/${restaurantId}`, {headers});
  }
  getAllOrdersByOwner(): Observable<OrderResponse[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get<OrderResponse[]>(`${this.baseUrl}/all-by-owner`, {headers});
  }
  getRestaurantOrders(restaurantId: number): Observable<OrderResponse[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get<OrderResponse[]>(`${this.baseUrl}/${restaurantId}`, {headers});
  }

}

