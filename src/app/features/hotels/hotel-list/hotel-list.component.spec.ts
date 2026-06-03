import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HotelListComponent } from './hotel-list.component';
import { HotelService } from '../../../core/services/hotel.service';

describe('HotelListComponent', () => {
  let component: HotelListComponent;
  let fixture: ComponentFixture<HotelListComponent>;
  let hotelServiceSpy: jasmine.SpyObj<HotelService>;
  let router: Router;

  const mockHotels = [
    { id: 1, name: 'Hotel Atlântico', city: 'Rio de Janeiro', state: 'RJ', pricePerNight: 350 },
    { id: 2, name: 'Hotel Serra Verde', city: 'Gramado', state: 'RS', pricePerNight: 520 },
  ];

  beforeEach(async () => {
    hotelServiceSpy = jasmine.createSpyObj('HotelService', ['getAll']);
    hotelServiceSpy.getAll.and.returnValue(of(mockHotels));

    await TestBed.configureTestingModule({
      imports: [HotelListComponent],
      providers: [
        provideRouter([]),
        { provide: HotelService, useValue: hotelServiceSpy }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(HotelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load hotels on init', () => {
    expect(component.hotels.length).toBe(2);
    expect(hotelServiceSpy.getAll).toHaveBeenCalled();
  });

  it('should navigate to reservation form on reserve', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.reserve(1);
    expect(navigateSpy).toHaveBeenCalledWith(['/reservations/new', 1]);
  });
});
