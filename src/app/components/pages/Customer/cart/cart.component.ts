import { Component } from '@angular/core';
import { CartService } from '../../../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  DeliveryRequest,
  PaymentStatus,
} from '../../../../model/delivery-request.model';
import { OrderService } from '../../../../services/order.service';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../../../model/customer.model';
import { CustomerService } from '../../../../services/customer.service';
import { Plants } from '../../../../model/plant.model';
import { TranslatePipe } from '../../../../i18n/translate.pipe';
@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartItems: Plants[] = [];
  selectedPaymentMethod: string = 'cod';
  customerAddress: string = '';

  constructor(
    private cartService: CartService,
    private router: Router,
    private orderService: OrderService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });
    this.loadCustomerAddress();
  }

  increaseQuantity(item: any) {
    this.cartService.updateItemQuantity(item.id, item.quantity + 1);
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      this.cartService.updateItemQuantity(item.id, item.quantity - 1);
    } else {
      this.cartService.removeFromCart(item.id);
    }
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
  loadCustomerAddress() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user && user.userType === 'customer') {
      this.customerService.getCustomers(user.id).subscribe({
        next: (customer: Customer) => {
          this.customerAddress = customer.address;
        },
      });
    }
  }

  get paymentStatus(): PaymentStatus {
    return this.selectedPaymentMethod === 'cod' ? 'unpaid' : 'paid';
  }
  submitOrder() {
    const cartItems = this.cartService.getCurrentItems();

    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');

    const paymentAmount = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const deliveryRequest: DeliveryRequest = {
      id: Math.floor(Math.random() * 100000).toString(),

      deliveryDetails: this.customerAddress,
      date: new Date().toISOString(),
      customerId: user.id,
      deliveryStatus: 'pending',
      driverId: 0,
      paymentStatus: this.paymentStatus,
      paymentAmount: paymentAmount,
      plant: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category,
        price: item.price,
        image: item.image,
        description: item.description,
        idClient: item.idClient,
        quantity: item.quantity,
      })),
    };

    this.orderService.sendOrder(deliveryRequest).subscribe({
      next: () => {
        alert('✅ تم إرسال الطلب بنجاح!');
        this.cartService.clearCart();
      },
      error: () => {
        alert('❌ فشل إرسال الطلب');
      },
    });
  }
}
