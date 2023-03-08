import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RequestService } from './request.service';
import { SoftwareRequest } from './models/Software-request';
import { HardwareRequest } from './models/hardware-request';

describe('RequestService', () => {
  let service: RequestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ RequestService ]
    });
    service = TestBed.inject(RequestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

 

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a software request', () => {
    const request: SoftwareRequest = {
      softwareName: 'Test Software',
      requestedBy: 'Test User',
      requestId: '',
      manufacturingCompany: '',
      softwareCategory: '',
      requestStatus: '',
      requestedDate: undefined,
      reason: '',
      assetId: 0
    };
    service.sendSoftwareReqobj(request).subscribe((response: any) => {
      expect(response).toBeDefined();
    });
    const req = httpMock.expectOne('http://localhost:8080/requests/software/save');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should get all open software requests', () => {
    const requestStatus = 'Open';
    const requestedBy = 'Test User';
    const pageNumber = 1;
    service.getSoftwareAssetRequests(requestStatus, requestedBy, pageNumber).subscribe((response: any) => {
      expect(response).toBeDefined();
    });
    const req = httpMock.expectOne(`http://localhost:8080/requests/software/viewAll/${requestStatus}/${requestedBy}/${pageNumber}/5`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should send a hardware request', () => {
    const request: HardwareRequest = {
      hardwareType: 'Test Hardware',
      requestedBy: 'Test User',
      requestId: '',
      manufacturingCompany: '',
      modelName: '',
      configuration: '',
      requestStatus: '',
      requestedDate: undefined,
      reason: '',
      assetId: 0
    };
    service.sendHardwareReqobj(request).subscribe((response: any) => {
      expect(response).toBeDefined();
    });
    const req = httpMock.expectOne('http://localhost:8080/requests/hardware/save');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should get all open hardware requests', () => {
    const requestStatus = 'Open';
    const requestedBy = 'Test User';
    const pageNumber = 1;
    service.getHardwareAssetRequests(requestStatus, requestedBy, pageNumber).subscribe((response: any) => {
      expect(response).toBeDefined();
    });
    const req = httpMock.expectOne(`http://localhost:8080/requests/hardware/viewAll/${requestStatus}/${requestedBy}/${pageNumber}/5`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should update a software request', () => {
    const requestStatus = 'Approved';
    const requestId = '1';
    const reason = 'Test Reason';
    service.updateSoftwareRequest(requestStatus, requestId, reason).subscribe((response: any) => {
      expect(response).toBeDefined();
    });
    const req = httpMock.expectOne(`http://localhost:8080/requests/software/update/?status=${requestStatus}&reqId=${requestId}&reason=${reason}`);
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

});
