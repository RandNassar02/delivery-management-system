import { Component } from '@angular/core';
import { DriversService } from '../../../../services/drivers.service';
import { Driver } from '../../../../model/driver.model';
import { FormGroup ,FormBuilder , Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-driver',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-driver.component.html',
  styleUrl: './add-driver.component.scss'
})
export class AddDriverComponent {
driverForm :FormGroup;
successMessage = '';
constructor(private fb:FormBuilder , private driverService:DriversService , private router:Router){
  this.driverForm = this.fb.group({
      name: ['', Validators.required],
      vehicleType: ['', Validators.required],
      modelName: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.driverForm.valid) {
      const newDriver: Driver = this.driverForm.value;
      this.driverService.addDriver(newDriver).subscribe(() => {
        this.successMessage = 'Driver added successfully';
        this.driverForm.reset();
      });
    }
  }

driversList(){
  this.router.navigate(['admin/driversList'])
}

}


