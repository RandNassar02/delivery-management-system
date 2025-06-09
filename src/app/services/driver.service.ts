import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import * as bcrypt from 'bcryptjs';
import { AnyARecord } from 'dns';
import { Driver } from '../model/driver.model';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  private usersUrl = 'http://localhost:3000/users';
  private driversUrl = 'http://localhost:3000/drivers';
  constructor(private http: HttpClient) {}

  sigUpDriver(formData: {
    name: string;
    email: string;
    password: string;
    vehicleType: string;
    modelName: string;
    approvalStatus: string;
  }): Observable<any> {
    const hashedPassword = bcrypt.hashSync(formData.password, 10);

    const user = {
      email: formData.email,
      password: hashedPassword,
      userType: 'driver',
    };

    return this.http.get<any>(`${this.usersUrl}?email=${formData.email}`).pipe(
      switchMap((users) => {
        if (users.length > 0) {
          throw new Error('Email already exists');
        }

        return this.http.post(this.usersUrl, user).pipe(
          switchMap((newUser: any) => {
            const driver = {
              id: newUser.id,
              name: formData.name,
              email: formData.email,
              vehicleType: formData.vehicleType,
              modelName: formData.modelName,
              approvalStatus: 'pending',
            };

            return this.http.post(this.driversUrl, driver);
          })
        );
      })
    );
  }

  getDriverById(id: number): Observable<any> {
    return this.http.get(`${this.driversUrl}/${id}`);
  }
  getAllDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.driversUrl);
  }
}
