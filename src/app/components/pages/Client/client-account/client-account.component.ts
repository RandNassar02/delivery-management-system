import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Client } from '../../../../model/client.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../../services/client.service';

@Component({
  selector: 'app-client-account',
  imports: [CommonModule],
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
    console.log('User ID from localStorage:', userId);

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

  goToAddPlant(): void {
    this.router.navigate(['/client-addplant']);
  }

  goToPlants(): void {
    this.router.navigate(['/client-plants']);
  }

  logout(): void {
    this.authService.logout();
  }
}
