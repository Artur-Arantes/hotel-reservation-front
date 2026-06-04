import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Room, AvailabilityRequest } from '../models/room.model';

@Injectable({ providedIn: 'root' })
export class RoomService {

  private readonly apiUrl = `${environment.apiUrl}/api/rooms`;

  constructor(private http: HttpClient) {}

  getAvailable(request: AvailabilityRequest): Observable<Room[]> {
    return this.http.post<Room[]>(`${this.apiUrl}/availability`, request);
  }

  getById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/${id}`);
  }
}
