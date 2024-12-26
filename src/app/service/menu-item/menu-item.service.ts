import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CustomMenuItemResponse} from "../../model/response/CustomMenuItemResponse";

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {
  private baseUrl = 'http://localhost:8762';

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  constructor(private http: HttpClient) { }


  getCustomMenuItem(menuItemId: number){
    return this.http.get<CustomMenuItemResponse>(`${this.baseUrl}/api/restaurant/menu-item/select/${menuItemId}`, {headers: this.getHeaders()});
  }
}
