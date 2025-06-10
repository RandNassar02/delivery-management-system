import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Categories, Plants } from '../../../model/plant.model';
import { ActivatedRoute, Router } from '@angular/router';

import { PlantService } from '../../../services/plant.service';
import { CartService } from '../../../services/cart.service';
import { TranslatePipe } from '../../../i18n/translate.pipe';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { I18nService } from '../../../i18n/i18n.service';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-store',
  imports: [CommonModule, TranslatePipe, ToastModule],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss',
  providers: [MessageService],
})
export class StoreComponent {
  categories: Categories[] = [
    'Indoor-Plants',
    'Outdoor-Plants',
    'Edible-Plants',
    'Gardening-Tools',
  ];
  activeCategory: string = '';
  allPlants: Plants[] = [];
  filteredPlants: Plants[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,

    private plantservice: PlantService,
    private cartService: CartService,
    private messageService: MessageService,
    private translatePipe: I18nService,
    private authService: AuthService
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
    const readableCategory = this.activeCategory;
    this.filteredPlants = this.allPlants.filter(
      (plant) => plant.category === readableCategory
    );
  }
  addToCart(plant: Plants) {
    if (!this.authService.isLoggedIn()) {
      this.messageService.add({
        severity: 'warn',
        summary: this.translatePipe.t('messageServicetranslate.warning'),
        detail: this.translatePipe.t('messageServicetranslate.loginRequired'),
      });
      return;
    }

    this.cartService.addToCart({
      id: plant.id,
      name: plant.name,
      price: plant.price,
      quantity: 1,
      image: plant.image,
      idClient: plant.idClient,
    });

    this.messageService.add({
      severity: 'success',
      summary: this.translatePipe.t('messageServicetranslate.success'),
      detail: this.translatePipe.t('messageServicetranslate.plantAdded'),
    });
  }
  goToPlantDetails(plant: Plants) {
    this.router.navigate(['/plant-details', plant.id], {
      state: { category: this.activeCategory },
    });
  }
}
