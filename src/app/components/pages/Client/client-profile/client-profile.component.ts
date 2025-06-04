import { Component } from '@angular/core';
import { Client } from '../../../../model/client.model';
import { ClientService } from '../../../../services/client.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client-profile',
  standalone: true,

  imports: [CommonModule, FormsModule],
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.scss',
})
export class ClientProfileComponent {
  client: Client | null = null;
  editMode = false;
  editForm: Partial<Client> = {};

  defaultProfileImage: string =
    'https://res.cloudinary.com/dblomu3ce/image/upload/v1748284579/pngwing.com_2_xwl4gt.png';

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
        },
        error: () => {},
      });
    }
  }

  addPlant() {
    this.router.navigate(['/client-addplant']);
  }

  onProfileImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'plant_preset');
    const cloudName = 'dblomu3ce';

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (!this.client) return;
        this.client.imageProfile = data.secure_url;
        this.clientService.updateClient(this.client).subscribe({
          next: () => {
            console.log('Profile image updated successfully.');
          },
          error: (err) => {
            console.error('Error updating profile image:', err);
          },
        });
      })
      .catch((err) => {
        console.error('Error uploading profile image:', err);
      });
  }

  editProfile() {
    if (!this.client) return;

    this.editMode = true;

    this.editForm = {
      name: this.client.name,
      email: this.client.email,
      phone: this.client.phone,
      bankName: this.client.bankName,
      bankAccount: this.client.bankAccount,
      address: this.client.address,
    };
  }

  saveProfileChanges() {
    if (!this.client) return;

    const updatedClient = {
      ...this.client,
      ...this.editForm,
    };

    this.clientService.updateClient(updatedClient).subscribe({
      next: (res) => {
        this.client = res;
        this.editMode = false;
        alert('تم تحديث البيانات بنجاح ✅');
      },
      error: (err) => {
        console.error('فشل تحديث البيانات:', err);
        alert('حدث خطأ أثناء التحديث ❌');
      },
    });
  }

  cancelEdit() {
    this.editMode = false;
    this.editForm = {};
  }
}
