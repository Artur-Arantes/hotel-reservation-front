import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { HotelListComponent } from './features/hotels/hotel-list/hotel-list.component';
import { RoomListComponent } from './features/hotels/room-list/room-list.component';
import { ReservationFormComponent } from './features/reservations/reservation-form/reservation-form.component';
import { ReservationListComponent } from './features/reservations/reservation-list/reservation-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'hotels', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'hotels', component: HotelListComponent, canActivate: [authGuard] },
  { path: 'hotels/:hotelId/rooms', component: RoomListComponent, canActivate: [authGuard] },
  { path: 'reservations/new/:roomId', component: ReservationFormComponent, canActivate: [authGuard] },
  { path: 'reservations', component: ReservationListComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'hotels' }
];
