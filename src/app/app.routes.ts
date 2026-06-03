import { Routes } from '@angular/router';
import { HotelListComponent } from './features/hotels/hotel-list/hotel-list.component';
import { ReservationFormComponent } from './features/reservations/reservation-form/reservation-form.component';
import { ReservationListComponent } from './features/reservations/reservation-list/reservation-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'hotels', pathMatch: 'full' },
  { path: 'hotels', component: HotelListComponent },
  { path: 'reservations/new/:hotelId', component: ReservationFormComponent },
  { path: 'reservations', component: ReservationListComponent },
];