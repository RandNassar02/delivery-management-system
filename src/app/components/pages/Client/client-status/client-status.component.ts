import { Component } from '@angular/core';
import { Client } from '../../../../model/client.model';
import { Router } from '@angular/router';
import { TranslatePipe } from '../../../../i18n/translate.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-status',
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './client-status.component.html',
  styleUrl: './client-status.component.scss',
})
export class ClientStatusComponent {
  client: Client | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedClient = localStorage.getItem('currentUser');
    if (storedClient) {
      this.client = JSON.parse(storedClient);
    } else {
      this.router.navigate(['/login']);
    }
  }

  goToProfile() {
    this.router.navigate(['/client-profile']);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
