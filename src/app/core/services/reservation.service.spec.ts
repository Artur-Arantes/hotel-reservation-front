import { TestBed } from '@angular/core/testing';
import { ReservationService } from './reservation.service';
import { Reservation } from '../models/reservation.model';

describe('ReservationService', () => {
  let service: ReservationService;

  const mockReservation: Reservation = {
    hotelId: 1,
    guestName: 'João Silva',
    checkIn: '2026-07-01',
    checkOut: '2026-07-05',
    totalPrice: 1400,
    status: 'PENDING'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with no reservations', (done) => {
    service.getAll().subscribe(reservations => {
      expect(reservations.length).toBe(0);
      done();
    });
  });

  it('should create a reservation and assign an id', (done) => {
    service.create(mockReservation).subscribe(created => {
      expect(created.id).toBeDefined();
      expect(created.guestName).toBe('João Silva');
      done();
    });
  });

  it('should list created reservations', (done) => {
    service.create(mockReservation).subscribe(() => {
      service.getAll().subscribe(reservations => {
        expect(reservations.length).toBe(1);
        expect(reservations[0].hotelId).toBe(1);
        done();
      });
    });
  });
});
