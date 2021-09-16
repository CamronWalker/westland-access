import { TestBed } from '@angular/core/testing';

import { BreakpointServiceService } from './breakpoint-service.service';

describe('BreakpointServiceService', () => {
  let service: BreakpointServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreakpointServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
