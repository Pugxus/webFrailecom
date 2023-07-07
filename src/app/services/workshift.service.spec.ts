import { TestBed } from '@angular/core/testing';

import { WorkshiftService } from './workshift.service';

describe('WorkshiftService', () => {
  let service: WorkshiftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkshiftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
