import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LicenseExpireService } from './license-expire.service';
import { expireDataModel } from '../models/expire-model';

describe('LicenseExpireService', () => {
  let service: LicenseExpireService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ LicenseExpireService ]
    });
    service = TestBed.inject(LicenseExpireService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
  it('should retrieve expire data from the API via GET', () => {
    const mockExpireData: expireDataModel[] = [
      { id: 1, softwareName: 'Software1', licenseExpiryDate: new Date('2023-03-02'), expiresIn: 2 },
      {id: 2, softwareName: 'Software2', licenseExpiryDate: new Date('2023-03-03'), expiresIn: 3  }
    ];

    service.getExpireData().subscribe(expireData => {
      expect(expireData).toEqual(mockExpireData);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/softwareDashboard/aboutToExpire`);
    expect(req.request.method).toBe('GET');
    req.flush(mockExpireData);
  });

});
