import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSignUpComponent } from './customer-sign-up.component';

describe('CustomerSignUpComponent', () => {
  let component: CustomerSignUpComponent;
  let fixture: ComponentFixture<CustomerSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerSignUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
