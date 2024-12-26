import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {RevenueStats} from "../../model/RevenueStats";
import {FinishTimeStats} from "../../model/FinishTimeStats";
import {OrderCountStats} from "../../model/OrderCountStats";


@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  private baseUrl = 'http://localhost:8762';
  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  getDailyRevenue(restaurantId: number, startDate: string, endDate: string) {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get<RevenueStats[]>(`${this.baseUrl}/api/stats/user/${restaurantId}/daily-revenue`, {
      headers: this.getHeaders(),
      params: params
    });
  }
  getDailyFinishTime(restaurantId: number, startDate: string, endDate: string) {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get<FinishTimeStats[]>(`${this.baseUrl}/api/stats/user/${restaurantId}/daily-finish-time`, {
      headers: this.getHeaders(),
      params: params
    });
  }
  getDailyOrderCount(restaurantId: number, startDate: string, endDate: string) {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get<OrderCountStats[]>(`${this.baseUrl}/api/stats/user/${restaurantId}/daily-order-count`, {
      headers: this.getHeaders(),
      params: params
    });
  }
}
