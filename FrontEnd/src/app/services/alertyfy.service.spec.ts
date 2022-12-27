import { TestBed } from '@angular/core/testing';

import { AlertyfyService } from './alertyfy.service';

describe('AlertyfyService', () => {
  let service: AlertyfyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertyfyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
