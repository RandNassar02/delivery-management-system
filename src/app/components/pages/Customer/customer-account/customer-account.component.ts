import { Component } from '@angular/core';
import { Customer } from '../../../../model/customer.model';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-account',
  imports: [],
  templateUrl: './customer-account.component.html',
  styleUrl: './customer-account.component.scss',
})
export class CustomerAccountComponent {
  constructor(private authService: AuthService, private router: Router) {}
  Customer: Customer | null = null;

  isLoggedIn = false;
  userType: string | null = null;
  goToProfile() {
    this.router.navigate(['/customer-edit-account']);
  }

  goToOrders() {
    this.router.navigate(['/customer-account/orders']);
  }
  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.userType = null;
    this.router.navigate(['/']);
  }
}
