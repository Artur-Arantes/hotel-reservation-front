import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Reservation } from '../models/reservation.model';

@Injectable({ providedIn: 'root' })
export class ReservationService {

  private reservations: Reservation[] = [];

  create(reservation: Reservation): Observable<Reservation> {
    const newReservation = { ...reservation, id: Date.now() };
    this.reservations.push(newReservation);
    return of(newReservation);
  }

  getAll(): Observable<Reservation[]> {
    return of(this.reservations);
  }
}