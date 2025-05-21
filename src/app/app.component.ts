import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { I18nService } from './i18n/i18n.service';

import { FooterComponent } from './components/shared/footer/footer.component';
import { CustomerSignUpComponent } from './components/pages/Customer/customer-sign-up/customer-sign-up.component';
import { HeaderComponent } from './components/shared/header/header.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CustomerSignUpComponent,
    FooterComponent,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'delivery-management-system';
  constructor(private i18nService: I18nService) {}

  ngOnInit() {
    this.i18nService.loadTranslations('ar');
  }
}
