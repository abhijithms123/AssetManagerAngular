import { TestBed } from '@angular/core/testing';

import { HardwareServiceService } from './hardware-service.service';

describe('HardwareServiceService', () => {
  let service: HardwareServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HardwareServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
