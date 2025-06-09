import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

import { DrawerContentComponent } from '../../pages/Customer/drawer-content/drawer-content.component';
import { CartService } from '../../../services/cart.service';
import { TranslatePipe } from '../../../i18n/translate.pipe';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule, DrawerContentComponent, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isMenuOpen = false;
  isLoggedIn = false;
  userType: string | null = null;
  isDrawerOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    public cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        const user = JSON.parse(localStorage.getItem('currentUser')!);
        this.userType = user.userType;
      } else {
        this.userType = null;
      }
    });
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

  openDrawer() {
    this.isDrawerOpen = true;
    document.body.classList.add('no-scroll');
  }

  closeDrawer() {
    this.isDrawerOpen = false;
    document.body.classList.remove('no-scroll');
  }
}
