import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAllPlantsComponent } from './client-all-plants.component';

describe('ClientAllPlantsComponent', () => {
  let component: ClientAllPlantsComponent;
  let fixture: ComponentFixture<ClientAllPlantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientAllPlantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientAllPlantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
