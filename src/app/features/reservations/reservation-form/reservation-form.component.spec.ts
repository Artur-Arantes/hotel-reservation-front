import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ReservationFormComponent } from './reservation-form.component';
import { RoomService } from '../../../core/services/room.service';
import { Room } from '../../../core/models/room.model';
import { ReservationService } from '../../../core/services/reservation.service';

describe('ReservationFormComponent', () => {
  let component: ReservationFormComponent;
  let fixture: ComponentFixture<ReservationFormComponent>;
  let roomServiceSpy: jasmine.SpyObj<RoomService>;
  let reservationServiceSpy: jasmine.SpyObj<ReservationService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockRoom: Room = { id: 10, roomNumber: '101', type: 'STANDARD', capacity: 2, price: 350, hotelId: 1 };

  beforeEach(async () => {
    roomServiceSpy = jasmine.createSpyObj('RoomService', ['getById']);
    reservationServiceSpy = jasmine.createSpyObj('ReservationService', ['create']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    roomServiceSpy.getById.and.returnValue(of(mockRoom));

    await TestBed.configureTestingModule({
      imports: [ReservationFormComponent],
      providers: [
        { provide: RoomService, useValue: roomServiceSpy },
        { provide: ReservationService, useValue: reservationServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: { get: () => '10' },
              queryParamMap: { get: (k: string) => k === 'checkIn' ? '2026-07-01' : '2026-07-05' }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load room on init', () => {
    expect(component.room).toEqual(mockRoom as Room);
    expect(roomServiceSpy.getById).toHaveBeenCalledWith(10);
  });

  it('should read checkIn and checkOut from query params', () => {
    expect(component.checkIn).toBe('2026-07-01');
    expect(component.checkOut).toBe('2026-07-05');
  });

  it('should calculate nights correctly', () => {
    expect(component.nights).toBe(4);
  });

  it('should calculate total price correctly', () => {
    expect(component.totalPrice).toBe(1400); // 4 nights * R$350
  });

  it('should return 0 nights when check-out is before check-in', () => {
    component.checkIn = '2026-07-10';
    component.checkOut = '2026-07-05';
    expect(component.nights).toBe(0);
    expect(component.totalPrice).toBe(0);
  });

  it('should not submit when guestName is empty', () => {
    component.guestName = '';
    component.guestEmail = 'test@email.com';
    component.submit();
    expect(reservationServiceSpy.create).not.toHaveBeenCalled();
  });

  it('should submit reservation with correct data', () => {
    reservationServiceSpy.create.and.returnValue(of({
      id: 1, roomId: 10, guestName: 'Artur', guestEmail: 'artur@email.com',
      checkIn: '2026-07-01', checkOut: '2026-07-05', totalPrice: 1400, status: 'PENDING'
    } as any));

    component.guestName = 'Artur';
    component.guestEmail = 'artur@email.com';
    component.submit();

    expect(reservationServiceSpy.create).toHaveBeenCalledWith({
      roomId: 10,
      guestName: 'Artur',
      guestEmail: 'artur@email.com',
      checkIn: '2026-07-01',
      checkOut: '2026-07-05'
    });
  });

  it('should navigate to /reservations after successful submit', () => {
    reservationServiceSpy.create.and.returnValue(of({} as any));
    component.guestName = 'Artur';
    component.guestEmail = 'artur@email.com';
    component.submit();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/reservations']);
  });
});
