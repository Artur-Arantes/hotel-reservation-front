import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Hotel } from '../../../core/models/hotel.model';
import { HotelService } from '../../../core/services/hotel.service';
import { AuthService } from '../../../core/auth/auth.service';
import { getHotelImage, FERIAS_IMAGES } from '../../../core/utils/image.utils';

@Component({
  selector: 'app-hotel-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hotel-list.component.html',
  styleUrl: './hotel-list.component.css'
})
export class HotelListComponent implements OnInit, OnDestroy {
  hotels: Hotel[] = [];
  loading = true;

  feriasImages = FERIAS_IMAGES;
  currentSlide = 0;
  private slideInterval: ReturnType<typeof setInterval> | null = null;

  constructor(
    private hotelService: HotelService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.hotelService.getAll().subscribe({
      next: page => { this.hotels = page.content; this.loading = false; },
      error: () => this.loading = false
    });
    this.slideInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.feriasImages.length;
    }, 4000);
  }

  ngOnDestroy(): void {
    if (this.slideInterval) clearInterval(this.slideInterval);
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  getImage(hotel: Hotel): string {
    return getHotelImage(hotel.name, hotel.imageUrl);
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
