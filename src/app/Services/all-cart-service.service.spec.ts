import { TestBed } from '@angular/core/testing';

import { AllCartServiceService } from './all-cart-service.service';

describe('AllCartServiceService', () => {
  let service: AllCartServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllCartServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
