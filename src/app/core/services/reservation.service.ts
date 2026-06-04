import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Reservation, ReservationRequest, ReservationPage } from '../models/reservation.model';

@Injectable({ providedIn: 'root' })
export class ReservationService {

  private readonly apiUrl = `${environment.apiUrl}/api/reservations`;

  constructor(private http: HttpClient) {}

  getAll(page = 0, size = 10): Observable<ReservationPage> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<ReservationPage>(this.apiUrl, { params });
  }

  getById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiUrl}/${id}`);
  }

  create(request: ReservationRequest): Observable<Reservation> {
    return this.http.post<Reservation>(this.apiUrl, request);
  }

  cancel(id: number): Observable<Reservation> {
    return this.http.patch<Reservation>(`${this.apiUrl}/${id}/cancel`, {});
  }
}
