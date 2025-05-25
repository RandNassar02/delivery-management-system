import { Component } from '@angular/core';
import { Client } from '../../../../model/client.model';
import { ClientService } from '../../../../services/client.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-profile',
  imports: [CommonModule],
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.scss',
})
export class ClientProfileComponent {
  client: Client | null = null;
  approvalMessage: string | null = null;

  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit() {
    if (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    ) {
      const storedClient = localStorage.getItem('currentUser');
      if (!storedClient) {
        this.router.navigate(['/login']);
        return;
      }

      const clientData: Client = JSON.parse(storedClient);

      this.clientService.getClientById(clientData.id).subscribe({
        next: (freshClient) => {
          this.client = freshClient;

          if (freshClient.approvalStatus !== 'approved') {
            if (freshClient.approvalStatus === 'pending') {
              this.approvalMessage =
                'Your account is pending approval from the admin.';
            } else if (freshClient.approvalStatus === 'rejected') {
              this.approvalMessage =
                'Your account has been rejected. Please contact support.';
            }
          } else {
            this.approvalMessage = null;
          }
        },
        error: () => {
          this.approvalMessage = 'Error loading profile information.';
        },
      });
    }
  }

  addPlant() {
    this.router.navigate(['/client-addplant']);
  }
}
