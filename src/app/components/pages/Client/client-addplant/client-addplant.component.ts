import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Categories, Plants } from '../../../../model/plant.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-addplant',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-addplant.component.html',
  styleUrl: './client-addplant.component.scss',
})
export class ClientAddplantComponent {
  plantForm: FormGroup;
  categories: Categories[] = [
    'Indoor Plants',
    'Outdoor Plants',
    'Edible Plants',
    'Gardening Tools',
  ];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.plantForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.plantForm.valid) {
      const newPlant: Plants = this.plantForm.value;

      this.http.post('http://localhost:3000/plants', newPlant).subscribe({
        next: () => {
          alert('Plant added successfully!');
          this.router.navigate(['/client-dashboard']); // or another route
        },
        error: (err) => {
          console.error('Error adding plant:', err);
          alert('Failed to add plant');
        },
      });
    }
  }
}
