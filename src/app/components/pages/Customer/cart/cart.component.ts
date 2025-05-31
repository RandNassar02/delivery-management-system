import { Component } from '@angular/core';
import { CartService } from '../../../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartItems: any[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.refreshCart();
  }

  increaseQuantity(item: any) {
    this.cartService.updateItemQuantity(item.id, item.quantity + 1);
    this.refreshCart();
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      this.cartService.updateItemQuantity(item.id, item.quantity - 1);
    } else {
      this.cartService.removeFromCart(item.id);
    }
    this.refreshCart();
  }

  refreshCart() {
    this.cartItems = this.cartService.getCurrentItems();
  }
  deliveryFee = 2;

  getSubtotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  getTotal(): number {
    return this.getSubtotal() + this.deliveryFee;
  }
  gotostore() {
    this.router.navigate(['/store']);
  }
}
