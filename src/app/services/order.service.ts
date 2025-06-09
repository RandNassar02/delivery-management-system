import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeliveryRequest } from '../model/delivery-request.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/deliveryRequests';

  constructor(private http: HttpClient) {}

  sendOrder(order: DeliveryRequest): Observable<any> {
    return this.http.post(this.apiUrl, order);
  }
  getOrders(): Observable<DeliveryRequest[]> {
    return this.http.get<DeliveryRequest[]>(this.apiUrl);
  }
}
