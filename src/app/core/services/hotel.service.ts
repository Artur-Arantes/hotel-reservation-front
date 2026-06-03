import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hotel } from '../models/hotel.model';

@Injectable({ providedIn: 'root' })
export class HotelService {

  private hotels: Hotel[] = [
    { id: 1, name: 'Hotel Atlântico', city: 'Rio de Janeiro', state: 'RJ', pricePerNight: 350 },
    { id: 2, name: 'Hotel Serra Verde', city: 'Gramado', state: 'RS', pricePerNight: 520 },
    { id: 3, name: 'Hotel Paulista', city: 'São Paulo', state: 'SP', pricePerNight: 290 },
  ];

  getAll(): Observable<Hotel[]> {
    return of(this.hotels);
  }

  getById(id: number): Observable<Hotel | undefined> {
    return of(this.hotels.find(h => h.id === id));
  }
}