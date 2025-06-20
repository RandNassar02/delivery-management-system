import { Component } from '@angular/core';
import { I18nService } from '../../../i18n/i18n.service';
import { TranslatePipe } from '../../../i18n/translate.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  constructor(private i18nService: I18nService) {}
  language: 'en' | 'ar' = 'en';
  switchToArabic() {
    this.language = 'ar';
    this.i18nService.loadTranslations(this.language);
  }

  switchToEnglish() {
    this.language = 'en';
    this.i18nService.loadTranslations(this.language);
  }
}
