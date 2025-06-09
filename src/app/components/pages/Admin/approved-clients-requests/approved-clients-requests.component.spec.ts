import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedClientsRequestsComponent } from './approved-clients-requests.component';

describe('ApprovedClientsRequestsComponent', () => {
  let component: ApprovedClientsRequestsComponent;
  let fixture: ComponentFixture<ApprovedClientsRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovedClientsRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedClientsRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
