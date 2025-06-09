import { TestBed } from '@angular/core/testing';

import { CustomersPaymentsService } from './customers-payments.service';

describe('CustomersPaymentsService', () => {
  let service: CustomersPaymentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomersPaymentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
