import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ReservationFormComponent } from './reservation-form.component';
import { HotelService } from '../../../core/services/hotel.service';
import { ReservationService } from '../../../core/services/reservation.service';

describe('ReservationFormComponent', () => {
  let component: ReservationFormComponent;
  let fixture: ComponentFixture<ReservationFormComponent>;
  let hotelServiceSpy: jasmine.SpyObj<HotelService>;
  let reservationServiceSpy: jasmine.SpyObj<ReservationService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockHotel = { id: 1, name: 'Hotel Atlântico', city: 'Rio de Janeiro', state: 'RJ', pricePerNight: 350 };

  beforeEach(async () => {
    hotelServiceSpy = jasmine.createSpyObj('HotelService', ['getById']);
    reservationServiceSpy = jasmine.createSpyObj('ReservationService', ['create']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    hotelServiceSpy.getById.and.returnValue(of(mockHotel));

    await TestBed.configureTestingModule({
      imports: [ReservationFormComponent],
      providers: [
        { provide: HotelService, useValue: hotelServiceSpy },
        { provide: ReservationService, useValue: reservationServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } }
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

  it('should load hotel on init', () => {
    expect(component.hotel).toEqual(mockHotel);
  });

  it('should calculate total price correctly', () => {
    component.checkIn = '2026-07-01';
    component.checkOut = '2026-07-05';
    expect(component.totalPrice).toBe(1400);
  });

  it('should return 0 when check-out is before check-in', () => {
    component.checkIn = '2026-07-10';
    component.checkOut = '2026-07-05';
    expect(component.totalPrice).toBe(0);
  });

  it('should not submit when fields are empty', () => {
    component.guestName = '';
    component.submit();
    expect(reservationServiceSpy.create).not.toHaveBeenCalled();
  });

  it('should navigate to hotels on voltar', () => {
    component.voltar();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/hotels']);
  });

  it('should create reservation with correct data', () => {
    spyOn(window, 'alert');
    reservationServiceSpy.create.and.returnValue(of({
      id: 1, hotelId: 1, guestName: 'Artur', checkIn: '2026-07-01',
      checkOut: '2026-07-05', totalPrice: 1400, status: 'PENDING'
    }));

    component.guestName = 'Artur';
    component.checkIn = '2026-07-01';
    component.checkOut = '2026-07-05';
    component.submit();

    expect(reservationServiceSpy.create).toHaveBeenCalledWith(jasmine.objectContaining({
      guestName: 'Artur',
      hotelId: 1,
      totalPrice: 1400,
      status: 'PENDING'
    }));
  });
});
