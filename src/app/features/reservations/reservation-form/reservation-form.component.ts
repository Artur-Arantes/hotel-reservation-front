import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../../../core/models/room.model';
import { RoomService } from '../../../core/services/room.service';
import { ReservationService } from '../../../core/services/reservation.service';
import { getRoomImage } from '../../../core/utils/image.utils';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {
  room: Room | null = null;
  guestName = '';
  guestEmail = '';
  checkIn = '';
  checkOut = '';
  loading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roomService: RoomService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    const roomId = Number(this.route.snapshot.paramMap.get('roomId'));
    this.checkIn = this.route.snapshot.queryParamMap.get('checkIn') || '';
    this.checkOut = this.route.snapshot.queryParamMap.get('checkOut') || '';
    this.roomService.getById(roomId).subscribe(room => this.room = room);
  }

  get nights(): number {
    if (!this.checkIn || !this.checkOut) return 0;
    return Math.max(0, (new Date(this.checkOut).getTime() - new Date(this.checkIn).getTime()) / 86400000);
  }

  get totalPrice(): number {
    return this.room ? this.nights * this.room.price : 0;
  }

  getRoomImage(): string {
    return this.room ? getRoomImage(this.room.type) : '';
  }

  submit(): void {
    if (!this.room || !this.guestName || !this.guestEmail || this.totalPrice <= 0) return;
    this.loading = true;
    this.errorMessage = '';
    this.reservationService.create({
      roomId: this.room.id,
      guestName: this.guestName,
      guestEmail: this.guestEmail,
      checkIn: this.checkIn,
      checkOut: this.checkOut
    }).subscribe({
      next: () => this.router.navigate(['/reservations']),
      error: err => { this.errorMessage = err.error?.message || 'Erro ao realizar reserva.'; this.loading = false; }
    });
  }

  voltar(): void {
    window.history.back();
  }
}
