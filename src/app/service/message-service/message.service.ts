import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {RestaurantConversationsResponse} from "../../model/response/RestaurantConversationsResponse";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl = 'http://localhost:8083/api/conversation';
  constructor(private http: HttpClient) { }

  getAllRestaurantsWithConversationByUser(): Observable<RestaurantConversationsResponse[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<RestaurantConversationsResponse[]>(this.baseUrl, {headers});
  }
}
