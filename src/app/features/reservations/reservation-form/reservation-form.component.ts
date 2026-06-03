import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hotel } from '../../../core/models/hotel.model';
import { Reservation } from '../../../core/models/reservation.model';
import { HotelService } from '../../../core/services/hotel.service';
import { ReservationService } from '../../../core/services/reservation.service';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {
  hotel: Hotel | undefined;
  guestName = '';
  checkIn = '';
  checkOut = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('hotelId'));
    this.hotelService.getById(id).subscribe(hotel => this.hotel = hotel);
  }

  get totalPrice(): number {
    if (!this.checkIn || !this.checkOut || !this.hotel) return 0;
    const days = (new Date(this.checkOut).getTime() - new Date(this.checkIn).getTime()) / (1000 * 60 * 60 * 24);
    return days > 0 ? days * this.hotel.pricePerNight : 0;
  }

  submit(): void {
    if (!this.hotel || !this.guestName || !this.checkIn || !this.checkOut || this.totalPrice <= 0) return;

    const reservation: Reservation = {
      hotelId: this.hotel.id,
      guestName: this.guestName,
      checkIn: this.checkIn,
      checkOut: this.checkOut,
      totalPrice: this.totalPrice,
      status: 'PENDING'
    };

    this.reservationService.create(reservation).subscribe(() => {
      alert('Reserva realizada com sucesso!');
      this.router.navigate(['/hotels']);
    });
  }

  voltar(): void {
    this.router.navigate(['/hotels']);
  }
}