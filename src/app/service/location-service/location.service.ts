import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {LocationModel} from "../../model/LocationModel";
import {Observable} from "rxjs";
import {LocationRequest} from "../../model/request/LocationRequest";
import {ShortenUserLocationModel} from "../../model/ShortenUserLocationModel";
import {UserLocationResponse} from "../../model/response/UserLocationResponse";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private baseUrl = 'http://localhost:8762/api/security/location';

  constructor(private http: HttpClient) { }

  getAllLocationsByUser(): Observable<LocationModel[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<LocationModel[]>(`${this.baseUrl}/personal-locations`, { headers });
  }
  postLocation(location: LocationRequest){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(this.baseUrl, location, {headers});
  }
  updateLocation(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    const params = new HttpParams().set('id', id.toString());
    return this.http.patch(this.baseUrl, {}, { headers, params });
  }

  getCurrentLocation() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get(`${this.baseUrl}`, { headers, responseType: 'text' });
  }
  getShortenLocation() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<ShortenUserLocationModel[]>(`${this.baseUrl}/shorten-list`, { headers });
  }


}
