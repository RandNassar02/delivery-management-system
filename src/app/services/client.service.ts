import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private usersUrl = 'http://localhost:3000/users';
  private customersUrl = 'http://localhost:3000/customers';

  constructor(private http: HttpClient) {}

  signUpClient(formData: {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
  }): Observable<any> {
    const hashedPassword = bcrypt.hashSync(formData.password, 10);

    const user = {
      email: formData.email,
      password: hashedPassword,
      userType: 'client',
    };

    const customer = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
    };

    return this.http
      .post(this.usersUrl, user)
      .pipe(switchMap(() => this.http.post(this.customersUrl, customer)));
  }
}
