import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  constructor(private http: HttpClient) {}

  signup(user: {
    email: string;
    password: string;
    userType: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, user);
  }

  createCustomer(customer: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/customers`, customer);
  }

  createClient(client: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/clients`, client);
  }
  checkEmailExists(email: string): Observable<boolean> {
    return this.http
      .get<any[]>(`${this.apiUrl}/users?email=${email}`)
      .pipe(map((users) => users.length > 0));
  }
}
