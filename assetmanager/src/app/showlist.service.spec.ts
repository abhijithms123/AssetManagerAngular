import { TestBed } from '@angular/core/testing';

import { ShowlistService } from './showlist.service';

describe('ShowlistService', () => {
  let service: ShowlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
