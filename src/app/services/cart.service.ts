import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
const CART_KEY = 'cart';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>(this.loadCart());
  cartItems$ = this.cartItems.asObservable();

  private cartCount = new BehaviorSubject<number>(
    this.calculateTotalCount(this.loadCart())
  );
  cartCount$ = this.cartCount.asObservable();

  constructor() {}

  private loadCart(): any[] {
    if (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    ) {
      const stored = localStorage.getItem(CART_KEY);
      return stored ? JSON.parse(stored) : [];
    }

    return [];
  }

  private saveCart(items: any[]) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    this.cartItems.next(items);
    this.cartCount.next(this.calculateTotalCount(items));
  }

  private calculateTotalCount(items: any[]): number {
    return items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  }

  addToCart(item: any) {
    const current = this.loadCart();
    const index = current.findIndex((i) => i.id === item.id);

    if (index > -1) {
      current[index].quantity += item.quantity || 1;
    } else {
      current.push({
        ...item,
        quantity: item.quantity || 1,
        idClient: item.idClient,
      });
    }

    this.saveCart(current);
  }

  removeFromCart(productId: number) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart = cart.filter((item: any) => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.updateCartItems(cart);
    this.updateCartCountFromStorage();
  }

  clearCart() {
    localStorage.removeItem(CART_KEY);
    this.cartItems.next([]);
    this.cartCount.next(0);
  }

  getCurrentItems(): any[] {
    return this.cartItems.value;
  }

  updateItemQuantity(itemId: any, quantity: number) {
    const current = this.loadCart();
    const index = current.findIndex((item) => item.id === itemId);
    if (index !== -1) {
      current[index].quantity = quantity;
      this.saveCart(current);
    }
  }
  private updateCartItems(items: any[]) {
    this.cartItems.next(items);
  }

  private updateCartCountFromStorage() {
    const items = this.loadCart();
    this.cartCount.next(this.calculateTotalCount(items));
  }
}
