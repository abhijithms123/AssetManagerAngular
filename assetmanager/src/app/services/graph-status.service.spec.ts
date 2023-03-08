import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GraphStatusService } from './graph-status.service';
import { GraphData } from '../models/graph-data';

describe('GraphStatusService', () => {
  let service: GraphStatusService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GraphStatusService]
    });
    service = TestBed.inject(GraphStatusService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve graph data', () => {
    const mockGraphData: GraphData = {
      totalPurchased: 3,
      totalInstalled: 2,
      totalAvailable: 1
    };
    service.getGraphData().subscribe(graphData => {
      expect(graphData).toEqual(mockGraphData);
    });
    const req = httpTestingController.expectOne(`${service['baseUrl']}/graphData`);
    expect(req.request.method).toBe('GET');
    req.flush(mockGraphData);
  });
});
