import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../services/driver.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html'
})
export class RequestsComponent implements OnInit {
  requests = [];

  constructor(private driverService: DriverService) {}

  ngOnInit(): void {
    this.driverService.getAssignedRequests().subscribe(data => {
      this.requests = data;
    });
  }
}
