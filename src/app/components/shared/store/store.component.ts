import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-store',
  imports: [CommonModule],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss',
})
export class StoreComponent {
  categories = [
    'Indoor Plants',
    'Outdoor Plants',
    'Edible Plants',
    'Gardening Tools',
  ];
  activeCategory = this.categories[0];

  selectCategory(category: string) {
    this.activeCategory = category;
  }
}
