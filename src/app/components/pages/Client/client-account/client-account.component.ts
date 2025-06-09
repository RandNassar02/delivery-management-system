import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Client } from '../../../../model/client.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../../services/client.service';
import { TranslatePipe } from '../../../../i18n/translate.pipe';

@Component({
  selector: 'app-client-account',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './client-account.component.html',
  styleUrl: './client-account.component.scss',
})
export class ClientAccountComponent {
  client: Client | null = null;

  constructor(
    private authService: AuthService,
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserID();

    if (userId) {
      this.clientService.getClientById(userId).subscribe({
        next: (data) => {
          console.log('Client data:', data);
          this.client = data;
        },
        error: (err) => {
          console.error('Error fetching client:', err);
        },
      });
    } else {
      console.warn('No user ID found in localStorage');
    }
  }

  goToProfile(): void {
    this.router.navigate(['/client-profile']);
  }

  goToPlants(): void {
    this.router.navigate(['/client-plants']);
  }

  goToOrders(): void {
    this.router.navigate(['/client-orders']);
  }

  logout(): void {
    this.authService.logout();
  }
}
