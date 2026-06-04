import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Reservation } from '../../../core/models/reservation.model';
import { ReservationService } from '../../../core/services/reservation.service';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent implements OnInit {
  reservations: Reservation[] = [];
  loading = true;

  constructor(
    private reservationService: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reservationService.getAll().subscribe({
      next: page => {
        this.reservations = page.content;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  cancel(id: number): void {
    if (!confirm('Deseja cancelar esta reserva?')) return;
    this.reservationService.cancel(id).subscribe(updated => {
      const index = this.reservations.findIndex(r => r.id === id);
      if (index !== -1) this.reservations[index] = updated;
    });
  }

  voltar(): void {
    this.router.navigate(['/hotels']);
  }
}
