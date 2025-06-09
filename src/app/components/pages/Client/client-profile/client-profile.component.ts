import { Component } from '@angular/core';
import { Client } from '../../../../model/client.model';
import { ClientService } from '../../../../services/client.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TranslatePipe } from '../../../../i18n/translate.pipe';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-client-profile',
  standalone: true,
  providers: [MessageService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    TranslatePipe,
  ],
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.scss',
})
export class ClientProfileComponent {
  client: Client | null = null;
  editFormClient: Partial<Client> = {};
  editForm!: FormGroup;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();

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
          this.editForm.patchValue({
            name: freshClient.name,
            email: freshClient.email,
            phone: freshClient.phone,
            bankName: freshClient.bankName,
            bankAccount: freshClient.bankAccount,
            address: freshClient.address,
          });
          this.editForm.markAsPristine();
          this.editForm.markAsUntouched();
        },
        error: () => {
          this.router.navigate(['/login']);
        },
      });
    }
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

  saveProfileChanges() {
    if (!this.client) return;

    const updatedClient = {
      ...this.client,
      ...this.editForm.value,
    };

    this.clientService.updateClient(updatedClient).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'sucsses',
          detail: 'creation account completed successfully',
        });
        this.client = res;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'An error occurred during account creation.',
        });
      },
    });
  }

  initForm() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      bankName: ['', [Validators.required, Validators.minLength(5)]],
      bankAccount: ['', [Validators.required, Validators.minLength(5)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
}
