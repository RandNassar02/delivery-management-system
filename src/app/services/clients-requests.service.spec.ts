import { TestBed } from '@angular/core/testing';

import { ClientsRequestsService } from './clients-requests.service';

describe('ClientsRequestsService', () => {
  let service: ClientsRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientsRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
