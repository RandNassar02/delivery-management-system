import { Component } from '@angular/core';
import { Customer } from '../../../../model/customer.model';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '../../../../i18n/translate.pipe';
import { CustomerService } from '../../../../services/customer.service';

@Component({
  selector: 'app-customer-account',
  imports: [TranslatePipe],
  templateUrl: './customer-account.component.html',
  styleUrl: './customer-account.component.scss',
})
export class CustomerAccountComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private customerService: CustomerService
  ) {}
  Customer: Customer | null = null;

  isLoggedIn = false;
  userType: string | null = null;

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userType = this.authService.getUserType();

    if (this.isLoggedIn && this.userType === 'customer') {
      const user = JSON.parse(localStorage.getItem('currentUser')!);
      this.customerService.getCustomers(user.id).subscribe((customer) => {
        this.Customer = customer;
      });
    }
  }
  goToProfile() {
    this.router.navigate(['/customer-edit-account']);
  }

  goToOrders() {
    this.router.navigate(['/customer-account/orders']);
  }
  logout() {
    this.authService.logout();
  }
}
