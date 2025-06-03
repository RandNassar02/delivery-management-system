import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DriverService } from '../../services/driver.service';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html'
})
export class RequestDetailsComponent implements OnInit {
  request: any;

  constructor(private route: ActivatedRoute, private driverService: DriverService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.driverService.getRequestById(id).subscribe(data => {
      this.request = data;
    });
  }

  updateStatus(status: string): void {
    this.driverService.updateStatus(this.request.id, status).subscribe(() => {
      this.request.deliveryStatus = status;
      alert('تم تحديث حالة الطلب');
    });
  }

  confirmPayment(): void {
    this.driverService.confirmPayment(this.request.id).subscribe(() => {
      this.request.paymentStatus = 'confirmed';
      alert('تم تأكيد استلام الدفع');
    });
  }
}
