import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCustomersPaymentsComponent } from './view-customers-payments.component';

describe('ViewCustomersPaymentsComponent', () => {
  let component: ViewCustomersPaymentsComponent;
  let fixture: ComponentFixture<ViewCustomersPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCustomersPaymentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCustomersPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
