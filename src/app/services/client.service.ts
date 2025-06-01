import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private usersUrl = 'http://localhost:3000/users';
  private clientsUrl = 'http://localhost:3000/clients';

  constructor(private http: HttpClient) {}

  signUpClient(formData: {
    name: string;
    email: string;
    password: string;
    phone: string;
    bankName: string;
    bankAccount: string;
    address: string;
  }): Observable<any> {
    const hashedPassword = bcrypt.hashSync(formData.password, 10);

    const user = {
      email: formData.email,
      password: hashedPassword,
      userType: 'client',
    };

    return this.http
      .get<any[]>(`${this.clientsUrl}?name=${formData.name}`)
      .pipe(
        switchMap((clientsWithSameName) => {
          if (clientsWithSameName.length > 0) {
            throw new Error('This client name is already in use.');
          }

          return this.http.post(this.usersUrl, user);
        }),
        switchMap((newUser: any) => {
          const client = {
            id: newUser.id,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            bankName: formData.bankName,
            bankAccount: formData.bankAccount,
            address: formData.address,
            approvalStatus: 'pending',
            imageProfile: '',
          };
          return this.http.post(this.clientsUrl, client);
        })
      );
  }

  getClientById(id: string): Observable<any> {
    return this.http.get(`${this.clientsUrl}/${id}`);
  }

  updateClient(client: any): Observable<any> {
    return this.http.put(`${this.clientsUrl}/${client.id}`, client);
  }
}
