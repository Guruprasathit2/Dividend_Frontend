import { TestBed } from '@angular/core/testing';

import { BrokApiService } from './brok-api.service';

describe('BrokApiService', () => {
  let service: BrokApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrokApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
