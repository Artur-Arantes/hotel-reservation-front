import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HotelService } from './hotel.service';
import { environment } from '../../../environments/environment';

describe('HotelService', () => {
  let service: HotelService;
  let httpMock: HttpTestingController;

  const mockPage = {
    content: [
      { id: 1, name: 'Hotel Atlântico', city: 'Rio de Janeiro', state: 'RJ' },
      { id: 2, name: 'Hotel Serra Verde', city: 'Gramado', state: 'RS' }
    ],
    totalElements: 2,
    totalPages: 1,
    number: 0
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(HotelService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET all hotels as a page', () => {
    service.getAll().subscribe(page => {
      expect(page.content.length).toBe(2);
      expect(page.content[0].name).toBe('Hotel Atlântico');
    });

    const req = httpMock.expectOne(r => r.url === `${environment.apiUrl}/api/hotels`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPage);
  });

  it('should GET hotel by id', () => {
    const mockHotel = { id: 1, name: 'Hotel Atlântico', city: 'Rio de Janeiro', state: 'RJ' };

    service.getById(1).subscribe(hotel => {
      expect(hotel.id).toBe(1);
      expect(hotel.name).toBe('Hotel Atlântico');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/hotels/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockHotel);
  });

  it('should pass page and size as query params', () => {
    service.getAll(2, 5).subscribe();

    const req = httpMock.expectOne(r =>
      r.url === `${environment.apiUrl}/api/hotels` &&
      r.params.get('page') === '2' &&
      r.params.get('size') === '5'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockPage);
  });
});
