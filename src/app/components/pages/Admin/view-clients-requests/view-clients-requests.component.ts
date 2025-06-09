import { Component, OnInit } from '@angular/core';
import { ClientsRequestsService } from '../../../../services/clients-requests.service';
import { ClientWithRequests } from '../../../../model/client-with-requests.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-view-clients-requests',
  imports: [CommonModule,FormsModule],
  templateUrl: './view-clients-requests.component.html',
  styleUrl: './view-clients-requests.component.scss',
})
export class ViewClientsRequestsComponent implements OnInit {
  clients: ClientWithRequests[] = [];
  filteredClients: ClientWithRequests[] = [];
  searchTerm = '';
  filterStatus = '';

  constructor(private service: ClientsRequestsService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.service.getClientsWithRequests().subscribe((data) => {
      this.clients = data;
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredClients = this.clients.filter(
      (client) =>
        client.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        (this.filterStatus === '' ||
          client.approvalStatus === this.filterStatus)
    );
  }

  updateStatus(clientId: string, status: string) {
    this.service.updateApprovalStatus(clientId, status).subscribe(() => {
      this.loadClients();
    });
  }
}
