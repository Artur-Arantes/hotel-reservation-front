import { TestBed } from '@angular/core/testing';
import { HotelService } from './hotel.service';

describe('HotelService', () => {
  let service: HotelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all hotels', (done) => {
    service.getAll().subscribe(hotels => {
      expect(hotels.length).toBe(3);
      done();
    });
  });

  it('should return a hotel by id', (done) => {
    service.getById(1).subscribe(hotel => {
      expect(hotel).toBeDefined();
      expect(hotel?.name).toBe('Hotel Atlântico');
      done();
    });
  });

  it('should return undefined for unknown id', (done) => {
    service.getById(999).subscribe(hotel => {
      expect(hotel).toBeUndefined();
      done();
    });
  });
});
