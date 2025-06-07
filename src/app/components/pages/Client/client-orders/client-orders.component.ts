import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DeliveryRequestService } from '../../../../services/delivery-request.service';
import {
  DeliveryRequest,
  DeliveryStatus,
} from '../../../../model/delivery-request.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { Customer } from '../../../../model/customer.model';
import { CustomerService } from '../../../../services/customer.service';
import { Driver } from '../../../../model/driver.model';
import { DriverService } from '../../../../services/driver.service';
@Component({
  selector: 'app-client-orders',
  imports: [CommonModule, FormsModule],
  templateUrl: './client-orders.component.html',
  styleUrl: './client-orders.component.scss',
})
export class ClientOrdersComponent {
  loading = true;
  allOrders: DeliveryRequest[] = [];
  filteredOrders: DeliveryRequest[] = [];
  customers: Customer[] = [];
  drivers: Driver[] = [];
  deliveryStatusOptions: DeliveryStatus[] = [
    'pending',
    'in_progress',
    'completed',
    'cancelled',
  ];

  constructor(
    private deliveryService: DeliveryRequestService,
    private authService: AuthService,
    private customerService: CustomerService,
    private driverService: DriverService
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
    this.loadDrivers();
    this.loadOrders();
  }

  loadCustomers() {
    this.customerService.getAllCustomers().subscribe((customers) => {
      this.customers = customers;
    });
  }

  loadDrivers() {
    this.driverService.getAllDrivers().subscribe((drivers) => {
      this.drivers = drivers;
      console.log('Drivers Loaded:', this.drivers);
    });
  }

  loadOrders(): void {
    const clientId = this.authService.getUserID();
    if (!clientId) {
      console.error('No client ID found');
      this.loading = false;
      return;
    }

    this.deliveryService.getAllOrders().subscribe((orders) => {
      this.allOrders = orders;
      this.filteredOrders = orders.filter((order) =>
        order.plant.some((p) => p.idClient === clientId)
      );
      this.loading = false;
    });
  }

  getCustomerById(id: number) {
    return this.customers.find((c) => c.id === id);
  }

  updateDeliveryStatus(order: DeliveryRequest): void {
    this.deliveryService.updateOrder(order).subscribe({
      next: () => console.log('Delivery status updated'),
      error: (err) => console.error('Failed to update', err),
    });
  }

  getTotalAmount(order: any): number {
    return order.plant.reduce(
      (total: number, plant: any) => total + plant.price * plant.quantity,
      0
    );
  }

  getDriverById(id: number) {
    return this.drivers.find((d) => d.id === id);
  }

  getDeliveryStatusClass(status: string): string {
    switch (status) {
      case 'pending':
        return 'bg-warning text-dark';
      case 'in_progress':
        return 'bg-info text-dark';
      case 'completed':
        return 'bg-success';
      case 'cancelled':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }
}
