import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AssetStatusWidgetService } from './asset-status-widget.service';
import { ResponseWidget } from '../models/response-widget';
import { Datastore } from '../models/datastore';

describe('AssetStatusWidgetService', () => {
  let service: AssetStatusWidgetService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AssetStatusWidgetService]
    });
    service = TestBed.inject(AssetStatusWidgetService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should get asset widget data', () => {
    const mockData: ResponseWidget[] = [
      { softwareCategory: 'application Software',
        available:3},
      { softwareCategory: 'Development',
      available:2}
    ];

    service.getAssetWidgetData().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('http://localhost:8080/softwareDashboard/asset-status-widget');
    expect(req.request.method).toBe('GET');

    req.flush(mockData);
  });

  it('should get asset counts', () => {
    const mockData: Datastore[] = [
      { type: "Laptop",
         unassignedCount: 2,
       assignedCount : 3},
      { type: "mouse",
      unassignedCount: 1,
    assignedCount : 2},
      { type: "Keyboard",
      unassignedCount: 2,
    assignedCount : 1 }
    ];

    service.getCounts().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('http://localhost:8080/hardwareDashboard/counts');
    expect(req.request.method).toBe('GET');

    req.flush(mockData);
  });

});
