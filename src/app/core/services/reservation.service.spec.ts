import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReservationService } from './reservation.service';
import { environment } from '../../../environments/environment';

describe('ReservationService', () => {
  let service: ReservationService;
  let httpMock: HttpTestingController;

  const mockReservation = {
    id: 1,
    roomId: 10,
    guestName: 'João Silva',
    guestEmail: 'joao@email.com',
    checkIn: '2026-07-01',
    checkOut: '2026-07-05',
    totalPrice: 1400,
    status: 'PENDING'
  };

  const mockPage = {
    content: [mockReservation],
    totalElements: 1,
    totalPages: 1,
    number: 0
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ReservationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET all reservations as a page', () => {
    service.getAll().subscribe(page => {
      expect(page.content.length).toBe(1);
      expect(page.content[0].guestName).toBe('João Silva');
    });

    const req = httpMock.expectOne(r => r.url === `${environment.apiUrl}/api/reservations`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPage);
  });

  it('should POST to create a reservation', () => {
    const request = {
      roomId: 10,
      guestName: 'João Silva',
      guestEmail: 'joao@email.com',
      checkIn: '2026-07-01',
      checkOut: '2026-07-05'
    };

    service.create(request).subscribe(res => {
      expect(res.id).toBe(1);
      expect(res.status).toBe('PENDING');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/reservations`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(request);
    req.flush(mockReservation);
  });

  it('should PATCH to cancel a reservation', () => {
    const cancelled = { ...mockReservation, status: 'CANCELLED' };

    service.cancel(1).subscribe(res => {
      expect(res.status).toBe('CANCELLED');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/reservations/1/cancel`);
    expect(req.request.method).toBe('PATCH');
    req.flush(cancelled);
  });

  it('should GET reservation by id', () => {
    service.getById(1).subscribe(res => {
      expect(res.id).toBe(1);
      expect(res.guestName).toBe('João Silva');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/reservations/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockReservation);
  });
});
