import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';
import { HotelListComponent } from './hotel-list.component';
import { HotelService } from '../../../core/services/hotel.service';
import { AuthService } from '../../../core/auth/auth.service';

describe('HotelListComponent', () => {
  let component: HotelListComponent;
  let fixture: ComponentFixture<HotelListComponent>;
  let hotelServiceSpy: jasmine.SpyObj<HotelService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let router: Router;

  const mockPage = {
    content: [
      { id: 1, name: 'Hotel Atlântico', city: 'Rio de Janeiro', state: 'RJ' },
      { id: 2, name: 'Hotel Serra Verde', city: 'Gramado', state: 'RS' }
    ],
    totalElements: 2,
    totalPages: 1,
    number: 0
  };

  beforeEach(async () => {
    hotelServiceSpy = jasmine.createSpyObj('HotelService', ['getAll']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);
    hotelServiceSpy.getAll.and.returnValue(of(mockPage));

    await TestBed.configureTestingModule({
      imports: [HotelListComponent],
      providers: [
        provideRouter([]),
        { provide: HotelService, useValue: hotelServiceSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(HotelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load hotels on init', () => {
    expect(component.hotels.length).toBe(2);
    expect(hotelServiceSpy.getAll).toHaveBeenCalled();
  });

  it('should set loading to false after hotels are loaded', () => {
    expect(component.loading).toBeFalse();
  });

  it('should navigate to rooms on verQuartos', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.verQuartos(1);
    expect(navigateSpy).toHaveBeenCalledWith(['/hotels', 1, 'rooms']);
  });

  it('should navigate to reservations on verReservas', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.verReservas();
    expect(navigateSpy).toHaveBeenCalledWith(['/reservations']);
  });

  it('should call authService logout', () => {
    component.logout();
    expect(authServiceSpy.logout).toHaveBeenCalled();
  });
});
