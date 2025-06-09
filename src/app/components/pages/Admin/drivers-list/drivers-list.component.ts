import { Component, OnInit } from '@angular/core';
import { Driver } from '../../../../model/driver.model';
import { DriversService } from '../../../../services/drivers.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-drivers-list',
  imports: [CommonModule , FormsModule],
  templateUrl: './drivers-list.component.html',
  styleUrl: './drivers-list.component.scss'
})
export class DriversListComponent implements OnInit  {
drivers: Driver[] = [];
  filteredDrivers: Driver[] = [];
  searchTerm: string = '';
  selectedVehicleType: string = '';
  vehicleTypes: string[] = [];

  constructor(private driversService: DriversService, private router: Router) {}

  ngOnInit(): void {
    this.loadDrivers();
  }

  loadDrivers(): void {
  this.driversService.getAllDrivers().subscribe((data) => {
    this.drivers = data;
    this.filteredDrivers = data;

    this.vehicleTypes = [...new Set(data.map(d => d.vehicleType))];
  });
}

  filterDrivers(): void {
    this.filteredDrivers = this.drivers.filter(driver =>
      driver.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.selectedVehicleType === '' || driver.vehicleType === this.selectedVehicleType)
    );
  }

  deleteDriver(id: number): void {
    if (confirm('هل أنت متأكد من حذف السائق؟')) {
      this.driversService.deleteDriver(id).subscribe(() => {
        this.loadDrivers();
      });
    }
  }

  
}
