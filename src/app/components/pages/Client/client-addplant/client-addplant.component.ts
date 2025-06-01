import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Categories, Plants } from '../../../../model/plant.model';
import { CommonModule } from '@angular/common';
import { PlantService } from '../../../../services/plant.service';
import { TranslatePipe } from '../../../../i18n/translate.pipe';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-client-addplant',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule,
    TranslatePipe,
    RouterLink,
  ],
  templateUrl: './client-addplant.component.html',
  styleUrls: ['./client-addplant.component.scss'],
  providers: [MessageService],
})
export class ClientAddplantComponent {
  plantForm: FormGroup;
  selectedImage: File | null = null;
  uploading = false;

  categories: Categories[] = [
    'Indoor Plants',
    'Outdoor Plants',
    'Edible Plants',
    'Gardening Tools',
  ];

  constructor(
    private fb: FormBuilder,
    private plantService: PlantService,
    private authService: AuthService,
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this.plantForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      description: [''],
      image: [''],
    });
  }

  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedImage = fileInput.files[0];
    }
  }

  async uploadImageToCloudinary(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'plant_preset');
    const cloudName = 'dblomu3ce';

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const response: any = await firstValueFrom(this.http.post(url, formData));
    return response.secure_url;
  }

  async onSubmit(): Promise<void> {
    if (this.plantForm.valid) {
      this.uploading = true;
      try {
        let imageUrl = '';
        if (this.selectedImage) {
          imageUrl = await this.uploadImageToCloudinary(this.selectedImage);
        }

        const plant: Omit<Plants, 'id'> = {
          ...this.plantForm.value,
          image: imageUrl,
          idClient: this.authService.getUserID(),
        };

        this.plantService.addPlant(plant).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Plant added successfully',
            });
            this.plantForm.reset();
            this.selectedImage = null;
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to add plant',
            });
          },
        });
      } catch {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Image upload failed.',
        });
      } finally {
        this.uploading = false;
      }
    }
  }
}
