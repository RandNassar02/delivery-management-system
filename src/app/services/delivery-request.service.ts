import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeliveryRequest } from '../model/delivery-request.model';

@Injectable({
  providedIn: 'root',
})
export class DeliveryRequestService {
  private apiUrl = 'http://localhost:3000/deliveryRequests';

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<DeliveryRequest[]> {
    return this.http.get<DeliveryRequest[]>(this.apiUrl);
  }

  getOrderById(id: number): Observable<DeliveryRequest> {
    return this.http.get<DeliveryRequest>(`${this.apiUrl}/${id}`);
  }

  updateOrder(order: DeliveryRequest): Observable<DeliveryRequest> {
    return this.http.put<DeliveryRequest>(`${this.apiUrl}/${order.id}`, order);
  }
}
