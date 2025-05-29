import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-order',
  imports: [CommonModule],
  templateUrl: './customer-order.component.html',
  styleUrl: './customer-order.component.scss',
})
export class CustomerOrderComponent {
  selectedTab: string = 'processing';
  orders: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.selectedTab = params['order_status'] || 'processing';
      this.fetchOrders();
    });
  }

  selectTab(tab: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { order_status: tab },
      //رح اخليها اذا رح ا  ينضاف فلتر هون
      queryParamsHandling: 'merge',
    });
  }

  fetchOrders() {
    //api
    //بجيبهم حسب حالتهم من ال client
    this.orders = [];
  }

  browseProducts() {
    this.router.navigate(['/store']);
  }
}
