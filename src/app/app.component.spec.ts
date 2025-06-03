import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'delivery-management-system' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('delivery-management-system');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, delivery-management-system');
  });
});


import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // بيانات السائقين
  drivers = [
    { id: 1, name: 'سامي', car: 'Toyota' },
    { id: 2, name: 'نادر', car: 'BMW' },
    { id: 3, name: 'علي', car: 'Tesla' },
  ];

  // نص البحث
  searchText: string = '';

  // سائق جديد (للفورم)
  newDriver = {
    name: '',
    car: ''
  };

  // فلترة حسب الاسم
  filteredDrivers() {
    return this.drivers.filter(driver =>
      driver.name?.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  // حذف سائق
  deleteDriver(index: number) {
    this.drivers.splice(index, 1);
  }

  // إضافة سائق جديد
  addDriver() {
    if (this.newDriver.name && this.newDriver.car) {
      this.drivers.push({ ...this.newDriver });
      this.newDriver = { name: '', car: '' };
    }
  }
}
