import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslatePipe } from './i18n/translate.pipe';
import { I18nService } from './i18n/i18n.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslatePipe],
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
