import { Component, OnInit } from '@angular/core';
import { ClientsRequestsService } from '../../../../services/clients-requests.service';
import { ClientWithRequests } from '../../../../model/client-with-requests.model';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-approved-clients-requests',
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './approved-clients-requests.component.html',
  styleUrl: './approved-clients-requests.component.scss'
})
export class ApprovedClientsRequestsComponent  implements OnInit{
approvedClients: ClientWithRequests[] = [];
searchTerm = '';

  constructor(private service: ClientsRequestsService , private location:Location) {}

  ngOnInit(): void {
    this.service.getClientsWithRequests().subscribe(data => {

      this.approvedClients = data.filter(c => c.approvalStatus === 'approved');
    });
  }
  goBack() {
  this.location.back();
}
}
