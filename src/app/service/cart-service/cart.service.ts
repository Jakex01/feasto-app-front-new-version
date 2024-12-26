import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Cart} from "../../model/Cart";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {CartItem} from "../../model/CartItem";
import {CartItemResponse} from "../../model/response/CartItemResponse";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = 'http://localhost:8762/api/basket';
  constructor(private http: HttpClient) { }
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();
  getCart(): Observable<CartItemResponse[]> {
    const headers = this.createAuthHeaders();
    return this.http.get<CartItemResponse[]>(`${this.baseUrl}`, { headers }).pipe(
      tap(cartItems => {
        this.cartCountSubject.next(cartItems.length);
      })
    );
  }
  getCartNo(): Observable<number> {
    const headers = this.createAuthHeaders();
    return this.http.get<number>(`${this.baseUrl}/no`, { headers });
  }

  removeItem(productId: number): Observable<Cart> {
    const headers = this.createAuthHeaders();
    return this.http.delete<Cart>(`${this.baseUrl}/items/${productId}`, { headers }).pipe(
      tap(() => {
        // Zmniejsz licznik produktów po usunięciu elementu
        const currentCount = this.cartCountSubject.value;
        this.cartCountSubject.next(Math.max(0, currentCount - 1));
      })
    );
  }

  postCart(cart: Cart): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.post<any>(`${this.baseUrl}/items`, cart, { headers }).pipe(
      tap(() => {
        const currentCount = this.cartCountSubject.value;
        this.cartCountSubject.next(currentCount + 1);
      })
    );
  }
  deleteCart(): Observable<void> {
    const headers = this.createAuthHeaders();
    return this.http.delete<void>(`${this.baseUrl}`, { headers });
  }

  private createAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Brak tokenu w localStorage.');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }
}
