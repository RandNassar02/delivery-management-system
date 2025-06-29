import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

import { DrawerContentComponent } from '../../pages/Customer/drawer-content/drawer-content.component';
import { CartService } from '../../../services/cart.service';
import { TranslatePipe } from '../../../i18n/translate.pipe';
import { I18nService } from '../../../i18n/i18n.service';

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
    private route: ActivatedRoute,
    private i18n: I18nService
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

  ngAfterViewInit() {
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        // Scroll to the element after the view is initialized
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  get drawerSideClass(): string {
    return this.i18n.getLanguage() === 'ar' ? 'drawer-left' : 'drawer-right';
  }
}
