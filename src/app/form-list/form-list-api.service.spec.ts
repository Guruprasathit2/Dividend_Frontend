import { TestBed } from '@angular/core/testing';

import { FormListApiService } from './form-list-api.service';

describe('FormListApiService', () => {
  let service: FormListApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormListApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
