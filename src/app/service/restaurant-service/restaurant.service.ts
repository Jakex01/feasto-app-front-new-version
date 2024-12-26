import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {RestaurantDtoModel} from "../../model/RestaurantDtoModel";
import {Observable} from "rxjs";
import {RestaurantFilterModel} from "../../model/RestaurantFilterModel";
import {CreateRestaurantModel} from "../../model/CreateRestaurantModel";
import {RestaurantResponse} from "../../model/response/RestaurantResponse";
import {UserLikeRestaurantResponse} from "../../model/response/UserLikeRestaurantResponse";
import {FilterOption} from "../../model/request/FilterOption";
import {Page} from "../../model/page";
import {RestaurantIdResponse} from "../../model/response/RestaurantIdResponse";
import {RestaurantDataShorten} from "../../model/response/RestaurantDataShorten";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private baseUrl = 'http://localhost:8762';
  private baseUrlForLike = 'http://localhost:8762';

  constructor(private http: HttpClient) { }
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  postRestaurant(restaurant: CreateRestaurantModel): Observable<RestaurantIdResponse> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.post<RestaurantIdResponse>(`${this.baseUrl}/api/restaurant/manage`, restaurant, { headers });
  }
  postImage(image: File, restaurantId: number): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append('image', image);

    // Send the request
    return this.http.post(`${this.baseUrl}/api/restaurant/manage/photo/${restaurantId}`, formData, { headers });
  }
  getAllRestaurants(page: number, size: number): Observable<Page<RestaurantDtoModel>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<RestaurantDtoModel>>(`${this.baseUrl}/api/restaurant/manage`, { params, headers: this.getHeaders() });
  }
  searchRestaurantsByName(mappedFilter: FilterOption, page: number, size: number): Observable<Page<RestaurantDtoModel>> {
    if(mappedFilter.sort === ""){
      mappedFilter.sort = "rating";
    }
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.post<Page<RestaurantDtoModel>>(`${this.baseUrl}/api/restaurant/manage/search`, mappedFilter, {params, headers: this.getHeaders()});
  }
  getRestaurantById(restaurantId: number) {
    return this.http.get<RestaurantResponse>(`${this.baseUrl}/api/restaurant/manage/${restaurantId}`, { headers: this.getHeaders()});
  }
  getUserLikeRestaurants(){
    return this.http.get<UserLikeRestaurantResponse[]>(`${this.baseUrlForLike}/api/restaurant/like`, {headers: this.getHeaders()});
  }
  deleteLikeRestaurant(restaurantId: number){
    return this.http.delete(`${this.baseUrlForLike}/api/restaurant/like/${restaurantId}`, {headers: this.getHeaders()});
  }
  putLikeRestaurant(restaurantId: number): Observable<any> {
    const url = `${this.baseUrlForLike}/api/restaurant/like?restaurantId=${restaurantId}`;
    return this.http.post(url, null, { headers: this.getHeaders() });
  }
  getUsersRestaurants() {
    return this.http.get<RestaurantDataShorten[]>(`${this.baseUrl}/api/restaurant/manage/owner`, {headers: this.getHeaders()});
  }

}

