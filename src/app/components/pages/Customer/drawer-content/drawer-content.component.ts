import { Component, EventEmitter, Output } from '@angular/core';
import { CartService } from '../../../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslatePipe } from '../../../../i18n/translate.pipe';
@Component({
  selector: 'app-drawer-content',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './drawer-content.component.html',
  styleUrl: './drawer-content.component.scss',
  standalone: true,
})
export class DrawerContentComponent {
  cartItems: any[] = [];
  @Output() closeDrawer = new EventEmitter<void>();

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  removeItem(itemToRemove: any) {
    this.cartService.removeFromCart(itemToRemove.id);
  }
  goToCart() {
    this.closeDrawer.emit();
    this.router.navigate(['/cart']);
  }
  gotostore() {
    this.closeDrawer.emit();
    this.router.navigate(['/store']);
  }
}
