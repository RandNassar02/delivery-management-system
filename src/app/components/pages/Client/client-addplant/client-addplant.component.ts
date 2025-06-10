import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
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
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-client-addplant',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, TranslatePipe],
  templateUrl: './client-addplant.component.html',
  styleUrls: ['./client-addplant.component.scss'],
  providers: [MessageService],
})
export class ClientAddplantComponent {
  @Input() plantToEdit: Plants | null = null;
  @Output() plantAdded = new EventEmitter<void>();
  @Output() saveEdit = new EventEmitter<Plants>();
  @Output() cancelEdit = new EventEmitter<void>();

  plantForm: FormGroup;
  selectedImage: File | null = null;
  uploading = false;

  categories: Categories[] = [
    'Indoor-Plants',
    'Outdoor-Plants',
    'Edible-Plants',
    'Gardening-Tools',
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['plantToEdit']) {
      if (this.plantToEdit) {
        this.plantForm.patchValue(this.plantToEdit);
        this.selectedImage = null;
      } else {
        this.plantForm.reset();
      }
    }
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
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
    if (this.plantForm.invalid) return;

    this.uploading = true;

    try {
      let imageUrl = this.plantForm.value.image || '';

      if (this.selectedImage) {
        imageUrl = await this.uploadImageToCloudinary(this.selectedImage);
      }

      const plantData: Plants = {
        ...this.plantForm.value,
        image: imageUrl,
        idClient: this.authService.getUserID(),
        id: this.plantToEdit ? this.plantToEdit.id : undefined,
      };

      if (this.plantToEdit) {
        this.plantService.updatePlant(plantData).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Plant updated successfully',
            });
            this.saveEdit.emit(plantData);
            this.resetForm();
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update plant',
            });
          },
        });
      } else {
        this.plantService.addPlant(plantData).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Plant added successfully',
            });
            this.plantAdded.emit();
            this.resetForm();
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to add plant',
            });
          },
        });
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Image upload failed',
      });
    } finally {
      this.uploading = false;
    }
  }

  resetForm() {
    this.plantForm.reset();
    this.selectedImage = null;
    this.plantToEdit = null;
  }

  onCancel() {
    this.cancelEdit.emit();
    this.resetForm();
  }
}
