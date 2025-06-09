import { Component } from '@angular/core';
import { TranslatePipe } from '../../../../i18n/translate.pipe';
import { Plants } from '../../../../model/plant.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../../services/cart.service';
import { PlantService } from '../../../../services/plant.service';
import { Client } from '../../../../model/client.model';
import { ClientService } from '../../../../services/client.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-plant-details',
  imports: [TranslatePipe, CommonModule, RouterLink, ToastModule],
  templateUrl: './plant-details.component.html',
  styleUrl: './plant-details.component.scss',
  providers: [MessageService],
})
export class PlantDetailsComponent {
  plant!: Plants;
  client?: Client;

  constructor(
    private route: ActivatedRoute,
    private plantService: PlantService,
    private cartService: CartService,
    private clientService: ClientService,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id') ?? '';
      this.plantService.getPlantsById(id).subscribe((data) => {
        this.plant = data;
        if (this.plant.idClient) {
          this.clientService
            .getClientById(this.plant.idClient)
            .subscribe((clientData) => {
              this.client = clientData;
            });
        }
      });
    });
  }
  addToCart(plant: Plants) {
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
      summary: 'Success',
      detail: 'Plant added to cart successfully!',
    });
  }
}
