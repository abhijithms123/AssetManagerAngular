import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HardwareListService } from './hardware-list.service';
import { HardwareAsset } from '../models/hardware-asset';

xdescribe('HardwareListService', () => {
  let service: HardwareListService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HardwareListService]
    });
    service = TestBed.inject(HardwareListService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get hardware data from backend', () => {
    const mockData = { pageNumber: 1,
      pageSize: 10,
      totalItems: 50,
      totalPages: 5,
    HardwareAvailableList: ["test","test"] };
    const pageNumber = 1;
    service.getBackendData(pageNumber).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/hardware/all?page=${pageNumber}&size=6`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should get hardware asset by ID from backend', () => {
    const mockData = { /* some mock hardware asset */ };
    const pageNumber = 1;
    const hardwareId = 123;
    service.getHardwareAsset(pageNumber, hardwareId).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/hardware/find?page=${pageNumber}&size=10&hardwareId=${hardwareId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should update hardware asset data in backend', () => {
    const mockHardwareAsset = { /* some mock hardware asset */ };
    const hardwareId = 123;
    service.putBackendData(mockHardwareAsset, hardwareId).subscribe(data => {
      expect(data).toBeNull();
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/hardware/update?hardwareId=${hardwareId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockHardwareAsset);
    req.flush(null);
  });

  it('should update hardware asset status in backend', () => {
    const mockIds = [123, 456, 789];
    const pageNumber = 1;
    service.updateStatus(pageNumber, mockIds).subscribe(data => {
      expect(data).toBeNull();
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/hardware/update/status`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockIds);
    req.flush(null);
  });

  it('should search for hardware assets in backend', () => {
    const mockData = { data: [/] };
    const pageNumber = 1;
    const searchTerm = 'keyboard';
    service.getSearchData(pageNumber, searchTerm).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/hardware/search?page=${pageNumber}&size=6&searchTerm=${searchTerm}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
