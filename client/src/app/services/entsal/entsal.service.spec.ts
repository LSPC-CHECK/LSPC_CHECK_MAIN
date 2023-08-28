import { TestBed } from '@angular/core/testing';

import { EntsalService } from './entsal.service';

describe('EntsalService', () => {
  let service: EntsalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntsalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
