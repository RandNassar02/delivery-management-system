import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Categories, Plants } from '../../../model/plant.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PlantService } from '../../../services/plant.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-store',
  imports: [CommonModule],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss',
})
export class StoreComponent {
  categories: Categories[] = [
    'Indoor Plants',
    'Outdoor Plants',
    'Edible Plants',
    'Gardening Tools',
  ];
  activeCategory: string = '';
  allPlants: Plants[] = [];
  filteredPlants: Plants[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private plantservice: PlantService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const categoryFromUrl = params.get('category');
      this.activeCategory = categoryFromUrl
        ? categoryFromUrl
        : this.categories[0];

      this.loadPlants();
    });
  }

  navigateToCategory(category: string) {
    this.router.navigate(['/store', category]);
  }

  loadPlants() {
    this.plantservice.getPlants().subscribe((plants) => {
      this.allPlants = plants;
      this.filterByCategory();
    });
  }

  filterByCategory() {
    this.filteredPlants = this.allPlants.filter(
      (plant) => plant.category === this.activeCategory
    );
  }
  addToCart(plant: Plants) {
    this.cartService.addToCart({
      id: plant.id,
      name: plant.name,
      price: plant.price,
      quantity: 1,
      image: plant.image,
    });
  }
}
