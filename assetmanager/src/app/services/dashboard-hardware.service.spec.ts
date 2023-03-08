import { TestBed } from '@angular/core/testing';

import { DashboardHardwareService } from './dashboard-hardware.service';

describe('DashboardHardwareService', () => {
  let service: DashboardHardwareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardHardwareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
