import { Component, OnInit } from '@angular/core';
import { ClientsManagementService } from '../../../../services/clients-management.service';
import { Client } from '../../../../model/clientsManag.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-clients-management',
  imports: [CommonModule],
  templateUrl: './clients-management.component.html',
  styleUrl: './clients-management.component.scss'
})
export class ClientsManagementComponent  implements OnInit{
clients: Client[] = [];

  constructor(private clientsService: ClientsManagementService) {}

  ngOnInit(): void {
    this.fetchPendingClients();
  }

  fetchPendingClients() {
    this.clientsService.getPendingClients().subscribe((data) => {
      this.clients = data;
    });
  }

  approve(id: number) {
    this.clientsService.approveClient(id).subscribe(() => {
      this.fetchPendingClients();
    });
  }

  reject(id: number) {
    this.clientsService.rejectClient(id).subscribe(() => {
      this.fetchPendingClients();
    });
  }
}





