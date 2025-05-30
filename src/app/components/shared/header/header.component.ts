import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { UserType } from '../../../model/user.model';
import { I18nService } from '../../../i18n/i18n.service';
import { CartComponent } from '../../pages/Customer/cart/cart.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule, CartComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isMenuOpen = false;
  isLoggedIn = false;
  userType: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      if (
        typeof window !== 'undefined' &&
        typeof window.localStorage !== 'undefined'
      ) {
        const user = JSON.parse(localStorage.getItem('currentUser')!);
        this.userType = user.userType;
      }
    } else {
      this.userType = null;
    }
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.userType = null;
    this.router.navigate(['/']);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const navItemsContainer = document.querySelector('.nav-items-container');
    if (this.isMenuOpen) {
      navItemsContainer?.classList.add('open');
    } else {
      navItemsContainer?.classList.remove('open');
    }
  }

  isDrawerOpen = false;

  openDrawer() {
    this.isDrawerOpen = true;
  }

  closeDrawer() {
    this.isDrawerOpen = false;
  }
}
