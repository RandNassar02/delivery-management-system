import { Component } from '@angular/core';
import { TranslatePipe } from '../../../i18n/translate.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  title = 'Not Found';
}
