import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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
    const userPayload = {
      email: data.email,
      password: data.password,
      userType: 'customer',
    };

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
  }
}
