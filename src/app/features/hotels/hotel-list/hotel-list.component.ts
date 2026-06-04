import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Hotel } from '../../../core/models/hotel.model';
import { HotelService } from '../../../core/services/hotel.service';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-hotel-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hotel-list.component.html',
  styleUrl: './hotel-list.component.css'
})
export class HotelListComponent implements OnInit {
  hotels: Hotel[] = [];
  loading = true;

  constructor(
    private hotelService: HotelService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.hotelService.getAll().subscribe({
      next: page => {
        this.hotels = page.content;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  verQuartos(hotelId: number): void {
    this.router.navigate(['/hotels', hotelId, 'rooms']);
  }

  verReservas(): void {
    this.router.navigate(['/reservations']);
  }

  logout(): void {
    this.authService.logout();
  }
}
