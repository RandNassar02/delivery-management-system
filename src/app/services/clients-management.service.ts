import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../model/clientsManag.model';


@Injectable({
  providedIn: 'root'
})
export class ClientsManagementService {
private baseUrl = 'http://localhost:3000/clientsManag';

  constructor(private http: HttpClient) {}

  getPendingClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.baseUrl}`);
  }

  approveClient(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, {});
  }

  rejectClient(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, {});
  }
}
