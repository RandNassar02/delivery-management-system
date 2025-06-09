import { Component } from '@angular/core';
import { CustomersPaymentsService } from '../../../../services/customers-payments.service';
import { Customer } from '../../../../model/customerPayment.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-customers-payments',
  imports: [FormsModule, CommonModule],
  templateUrl: './view-customers-payments.component.html',
  styleUrl: './view-customers-payments.component.scss'
})
export class ViewCustomersPaymentsComponent {
 customers: Customer[] = [];
  searchTerm: string = '';

  constructor(private customerService: CustomersPaymentsService) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(data => {
      this.customers = data;
    });
  }

  get filteredCustomers(): Customer[] {
    return this.customers.filter(c =>
      c.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
