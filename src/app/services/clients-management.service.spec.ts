import { TestBed } from '@angular/core/testing';

import { ClientsManagementService } from './clients-management.service';

describe('ClientsManagementService', () => {
  let service: ClientsManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientsManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
