import { Component, Input, SimpleChanges } from '@angular/core';
import { Plants } from '../../../../model/plant.model';
import { PlantService } from '../../../../services/plant.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';
import { ClientAddplantComponent } from '../client-addplant/client-addplant.component';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslatePipe } from '../../../../i18n/translate.pipe';

@Component({
  selector: 'app-client-all-plants',
  standalone: true,
  imports: [CommonModule, ClientAddplantComponent, TranslatePipe],
  templateUrl: './client-all-plants.component.html',
  styleUrl: './client-all-plants.component.scss',
})
export class ClientAllPlantsComponent {
  plants: Plants[] = [];
  loading = true;
  selectedPlant: Plants | null = null;

  constructor(
    private authService: AuthService,
    private plantsService: PlantService
  ) {}

  ngOnInit(): void {
    this.loadPlants();
  }

  loadPlants() {
    const clientId = this.authService.getUserID();
    if (!clientId) {
      console.error('No client ID found');
      this.loading = false;
      return;
    }

    this.loading = true;
    this.plantsService.getPlantsByClientId(clientId).subscribe({
      next: (data: Plants[]) => {
        this.plants = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading plants:', err);
        this.loading = false;
      },
    });
  }

  deletePlant(id: number): void {
    if (confirm('Are you sure you want to delete this plant?')) {
      this.plantsService.deletePlant(id).subscribe({
        next: () => this.loadPlants(),
        error: (err) => console.error('Error deleting plant:', err),
      });
    }
  }

  editPlant(plant: Plants): void {
    this.selectedPlant = { ...plant };
  }

  onCancelEdit(): void {
    this.selectedPlant = null;
  }

  onSaveEdit(updatedPlant: Plants): void {
    this.plantsService.updatePlant(updatedPlant).subscribe({
      next: () => {
        this.selectedPlant = null;
        this.loadPlants();
      },
      error: (err) => console.error('Error updating plant:', err),
    });
  }
}
