import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotel } from '../../../core/models/hotel.model';
import { Room } from '../../../core/models/room.model';
import { HotelService } from '../../../core/services/hotel.service';
import { RoomService } from '../../../core/services/room.service';
import { getHotelImage, getRoomImage } from '../../../core/utils/image.utils';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css'
})
export class RoomListComponent implements OnInit {
  hotel: Hotel | null = null;
  rooms: Room[] = [];
  checkIn = '';
  checkOut = '';
  searched = false;
  loading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('hotelId'));
    this.hotelService.getById(id).subscribe(hotel => this.hotel = hotel);
  }

  getHotelImage(): string {
    if (!this.hotel) return '';
    return getHotelImage(this.hotel.name, this.hotel.imageUrl);
  }

  getRoomImage(type: string): string {
    return getRoomImage(type);
  }

  search(): void {
    if (!this.checkIn || !this.checkOut || !this.hotel) return;
    this.loading = true;
    this.errorMessage = '';
    this.roomService.getAvailable({
      hotelId: this.hotel.id,
      checkIn: this.checkIn,
      checkOut: this.checkOut
    }).subscribe({
      next: rooms => { this.rooms = rooms; this.searched = true; this.loading = false; },
      error: err => { this.errorMessage = err.error?.message || 'Erro ao buscar quartos.'; this.loading = false; }
    });
  }

  reserve(room: Room): void {
    this.router.navigate(['/reservations/new', room.id], {
      queryParams: { checkIn: this.checkIn, checkOut: this.checkOut }
    });
  }

  voltar(): void {
    this.router.navigate(['/hotels']);
  }

  get nights(): number {
    if (!this.checkIn || !this.checkOut) return 0;
    return Math.max(0, (new Date(this.checkOut).getTime() - new Date(this.checkIn).getTime()) / 86400000);
  }
}
