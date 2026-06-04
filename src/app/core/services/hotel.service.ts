import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Hotel, HotelPage } from '../models/hotel.model';

@Injectable({ providedIn: 'root' })
export class HotelService {

  private readonly apiUrl = `${environment.apiUrl}/api/hotels`;

  constructor(private http: HttpClient) {}

  getAll(page = 0, size = 10): Observable<HotelPage> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<HotelPage>(this.apiUrl, { params });
  }

  getById(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.apiUrl}/${id}`);
  }
}
