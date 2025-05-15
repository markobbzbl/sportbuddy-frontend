import { TestBed } from '@angular/core/testing';
import { SportlerService } from './sportler.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Sportler } from '../app/model/sportler.model';

describe('SportlerService', () => {
  let service: SportlerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SportlerService],
    });

    service = TestBed.inject(SportlerService);
    httpMock = TestBed.inject(HttpTestingController);

    // Set up mock session storage
    spyOn(window.sessionStorage, 'getItem').and.callFake((key: string): string | null => {
      if (key === 'access_token') return 'mock-token';
      return null;
    });
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve sportler list with authorization header', () => {
    service.getSportler().subscribe((data) => {
      expect(data.length).toBe(2);
    });

    const req = httpMock.expectOne('http://localhost:9090/api/sportler');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');

    req.flush([
      { id: 1, username: 'john' },
      { id: 2, username: 'jane' },
    ]);
  });

  it('should return sportler by username', () => {
    const mockData: Sportler[] = [
      { id: 1, username: 'john' } as Sportler,
      { id: 2, username: 'jane' } as Sportler,
    ];

    service.getSportlerByUsername('jane').subscribe((sportler) => {
      expect(sportler).toEqual(mockData[1]);
    });

    const req = httpMock.expectOne('http://localhost:9090/api/sportler');
    req.flush(mockData);
  });

  it('should return null if username not found', () => {
    const mockData: Sportler[] = [
      { id: 1, username: 'john' } as Sportler,
    ];

    service.getSportlerByUsername('nonexistent').subscribe((sportler) => {
      expect(sportler).toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:9090/api/sportler');
    req.flush(mockData);
  });

  it('should throw error if token not found', () => {
    (window.sessionStorage.getItem as jasmine.Spy).and.returnValue(null);

    expect(() => {
      service.getSportler().subscribe();
    }).toThrowError('No token found');
  });
});
