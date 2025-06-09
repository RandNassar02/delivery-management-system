import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { Customer } from '../model/customerPayment.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomersPaymentsService {
private apiUrl = 'http://localhost:3000/customers';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }
}
