import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,map,forkJoin} from 'rxjs';
import { Client } from '../model/client.model';
import { Request } from '../model/request.model';
import { ClientWithRequests } from '../model/client-with-requests.model';


@Injectable({
  providedIn: 'root'
})
export class ClientsRequestsService {
private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getClientsWithRequests(): Observable<ClientWithRequests[]> {
    const clients$ = this.http.get<Client[]>(`${this.baseUrl}/clients`);
    const requests$ = this.http.get<Request[]>(`${this.baseUrl}/requests`);

    return forkJoin([clients$, requests$]).pipe(
      map(([clients, requests]) =>
        clients.map(client => ({
          ...client,
          requests: requests.filter(r => r.clientId.toString() === client.id)
        }))
      )
    );
  }

  updateApprovalStatus(clientId: string, status: string) {
    return this.http.patch(`${this.baseUrl}/clients/${clientId}`, {
      approvalStatus: status
    });
  }
}
