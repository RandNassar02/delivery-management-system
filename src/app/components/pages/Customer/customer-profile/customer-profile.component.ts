import { Component } from '@angular/core';
import { Customer } from '../../../../model/customer.model';
import { CustomerService } from '../../../../services/customer.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-profile',
  imports: [CommonModule],
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.scss',
})
export class CustomerProfileComponent {
  Customer: Customer | null = null;
  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}
  ngOnInit() {
    if (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    ) {
      const storedCustomer = localStorage.getItem('currentUser');
      if (!storedCustomer) {
        this.router.navigate(['/login']);
        return;
      }
      const customersdata: Customer = JSON.parse(storedCustomer);
      this.customerService.getCustomers(customersdata.id).subscribe({
        next: (freshCustomer) => {
          this.Customer = freshCustomer;
        },
        error: () => {},
      });
    }
  }
}
