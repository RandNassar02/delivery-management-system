import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAddplantComponent } from './client-addplant.component';

describe('ClientAddplantComponent', () => {
  let component: ClientAddplantComponent;
  let fixture: ComponentFixture<ClientAddplantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientAddplantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientAddplantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
