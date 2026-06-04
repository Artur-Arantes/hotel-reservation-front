import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';
import { ReservationListComponent } from './reservation-list.component';
import { ReservationService } from '../../../core/services/reservation.service';
import { Reservation, ReservationPage } from '../../../core/models/reservation.model';

describe('ReservationListComponent', () => {
  let component: ReservationListComponent;
  let fixture: ComponentFixture<ReservationListComponent>;
  let reservationServiceSpy: jasmine.SpyObj<ReservationService>;
  let router: Router;

  const mockReservations: Reservation[] = [
    { id: 1, roomId: 10, guestName: 'João Silva', guestEmail: 'joao@email.com',
      checkIn: '2026-07-01', checkOut: '2026-07-05', totalPrice: 1400, status: 'PENDING' },
    { id: 2, roomId: 11, guestName: 'Maria Souza', guestEmail: 'maria@email.com',
      checkIn: '2026-08-10', checkOut: '2026-08-15', totalPrice: 2500, status: 'CONFIRMED' }
  ];

  const mockPage: ReservationPage = { content: mockReservations, totalElements: 2, totalPages: 1, number: 0 };

  beforeEach(async () => {
    reservationServiceSpy = jasmine.createSpyObj('ReservationService', ['getAll', 'cancel']);
    reservationServiceSpy.getAll.and.returnValue(of(mockPage));

    await TestBed.configureTestingModule({
      imports: [ReservationListComponent],
      providers: [
        provideRouter([]),
        { provide: ReservationService, useValue: reservationServiceSpy }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ReservationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load reservations on init', () => {
    expect(component.reservations.length).toBe(2);
    expect(component.loading).toBeFalse();
  });

  it('should display correct guest names', () => {
    expect(component.reservations[0].guestName).toBe('João Silva');
    expect(component.reservations[1].guestName).toBe('Maria Souza');
  });

  it('should cancel a reservation and update status in list', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const cancelled = { ...mockReservations[0], status: 'CANCELLED' };
    reservationServiceSpy.cancel.and.returnValue(of(cancelled as any));

    component.cancel(1);

    expect(reservationServiceSpy.cancel).toHaveBeenCalledWith(1);
    expect(component.reservations[0].status).toBe('CANCELLED');
  });

  it('should not cancel when user declines confirm dialog', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.cancel(1);
    expect(reservationServiceSpy.cancel).not.toHaveBeenCalled();
  });

  it('should navigate to /hotels on voltar', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.voltar();
    expect(navigateSpy).toHaveBeenCalledWith(['/hotels']);
  });
});
