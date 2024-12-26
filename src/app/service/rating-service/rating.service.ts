import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RatingResponse} from "../../model/response/RatingResponse";
import {PostRatingRequest} from "../../model/request/PostRatingRequest";

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private baseUrl = 'http://localhost:8762/api/restaurant/rating';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
  getAverageComment(restaurantId: number, averageRating?: number){
    let queryParams = '';
    if (averageRating !== undefined) {
      queryParams = `?averageRating=${averageRating}`;
    }

    return this.http.get<RatingResponse>(`${this.baseUrl}/average/${restaurantId}${queryParams}`);
  }
  getRestaurantComments(restaurantId: number){
    return this.http.get<RatingResponse[]>(`${this.baseUrl}/${restaurantId}`);
  }
  postRestaurantReview(postRatingRequest: PostRatingRequest) {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    console.log(postRatingRequest);
    console.log(headers);
    return this.http.post(`${this.baseUrl}`, postRatingRequest, {headers});
  }

}
