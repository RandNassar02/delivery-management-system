import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import bcrypt from 'bcryptjs';

import { Observable, switchMap, throwError } from 'rxjs';
import { Customer } from '../model/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private usersUrl = 'http://localhost:3000/users';
  private customersUrl = 'http://localhost:3000/customers';
  constructor(private http: HttpClient) {}
  signUpCustomer(data: {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
  }): Observable<any> {
    const hashedPassword = bcrypt.hashSync(data.password, 10);

    const userPayload = {
      email: data.email,
      password: hashedPassword,
      userType: 'customer',
    };

    return this.http.get<any[]>(`${this.usersUrl}?email=${data.email}`).pipe(
      switchMap((users) => {
        if (users.length > 0) {
          return throwError(() => new Error('Email already exists'));
        }

        return this.http.post<any>(this.usersUrl, userPayload).pipe(
          switchMap((user) => {
            const customerPayload = {
              id: user.id,
              name: data.name,
              email: data.email,
              phone: data.phone,
              address: data.address,
            };

            return this.http.post(this.customersUrl, customerPayload);
          })
        );
      })
    );
  }

  getCustomers(id: string): Observable<any> {
    return this.http.get(`${this.customersUrl}/${id}`);
  }
  updateCustomer(id: string, data: any): Observable<any> {
    return this.http.put(`${this.customersUrl}/${id}`, data);
  }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customersUrl);
  }
}
