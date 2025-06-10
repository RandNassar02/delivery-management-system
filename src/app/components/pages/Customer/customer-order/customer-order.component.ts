import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '../../../../i18n/translate.pipe';
import { DeliveryStatus } from '../../../../model/delivery-request.model';
import { OrderService } from '../../../../services/order.service';

@Component({
  selector: 'app-customer-order',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './customer-order.component.html',
  styleUrl: './customer-order.component.scss',
})
export class CustomerOrderComponent {
  selectedTab: DeliveryStatus = 'pending';
  orders: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const status = params['order_status'];
      if (this.isValidStatus(status)) {
        this.selectedTab = status === 'pending' ? 'in_progress' : status;
      } else {
        this.selectedTab = 'in_progress';
      }
      this.fetchOrders();
    });
  }

  fetchOrders() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');

    this.orderService.getOrders().subscribe((orders) => {
      this.orders = orders.filter((order) => {
        const belongsToUser = order.customerId === user.id;

        if (this.selectedTab === 'in_progress') {
          return (
            belongsToUser &&
            ['pending', 'in_progress'].includes(order.deliveryStatus)
          );
        }

        return belongsToUser && order.deliveryStatus === this.selectedTab;
      });
    });
  }

  selectTab(tab: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { order_status: tab },

      queryParamsHandling: 'merge',
    });
  }
  isValidStatus(value: any): value is DeliveryStatus {
    return ['pending', 'in_progress', 'completed', 'cancelled'].includes(value);
  }

  browseProducts() {
    this.router.navigate(['/store']);
  }
}
