import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlantService } from '../../../../services/plant.service';

@Component({
  selector: 'app-client-addplant',
  imports: [],
  templateUrl: './client-addplant.component.html',
  styleUrl: './client-addplant.component.scss',
})
export class ClientAddplantComponent {
  addPlantForm: FormGroup;

  constructor(private plantService: PlantService, private fb: FormBuilder) {
    this.addPlantForm = this.fb.group({
      name: [''],
      image: [''],
      price: [''],
      description: [''],
      category: [''],
    });
  }
}
