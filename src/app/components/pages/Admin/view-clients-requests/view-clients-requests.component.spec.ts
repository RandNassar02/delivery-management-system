import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClientsRequestsComponent } from './view-clients-requests.component';

describe('ViewClientsRequestsComponent', () => {
  let component: ViewClientsRequestsComponent;
  let fixture: ComponentFixture<ViewClientsRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewClientsRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewClientsRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
