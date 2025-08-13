import { TestBed } from '@angular/core/testing';

import { MstrApiService } from './mstr-api.service';

describe('MstrApiService', () => {
  let service: MstrApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MstrApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
