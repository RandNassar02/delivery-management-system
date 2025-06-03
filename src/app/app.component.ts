import { Component } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { I18nService } from './i18n/i18n.service';
import { HeaderComponent } from './components/shared/header/header.component';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'delivery-management-system';
  showHeader = true;

  constructor(private i18nService: I18nService, private router: Router) {}

  ngOnInit() {
    this.i18nService.loadTranslations(this.i18nService.getLanguage());

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const hiddenRoutes = [
          '/signin',
          '/signup',
          '/signup-client',
          '/signup-driver',
        ];
        this.showHeader = !hiddenRoutes.includes(event.urlAfterRedirects);
      });
  }
}
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  drivers = [
    { id: 1, name: 'سامي', car: 'Toyota' },
    { id: 2, name: 'نادر', car: 'BMW' },
    { id: 3, name: 'علي', car: 'Tesla' },
  ];

  searchText: string = '';

  newDriver = {
    name: '',
    car: ''
  };

  filteredDrivers() {
    return this.drivers.filter(driver =>
      driver.name?.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  deleteDriver(index: number) {
    this.drivers.splice(index, 1);
  }

  addDriver() {
    if (this.newDriver.name && this.newDriver.car) {
      this.drivers.push({ ...this.newDriver });
      this.newDriver = { name: '', car: '' };
    }
  }
}

