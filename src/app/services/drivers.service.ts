import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Driver } from '../model/driver.model';

@Injectable({
  providedIn: 'root',
})
export class DriversService {
  private baseUrl = 'http://localhost:3000/drivers';

  constructor(private http: HttpClient) {}

  addDriver(driver: Driver): Observable<Driver> {
    return this.http.post<Driver>(this.baseUrl, driver);
  }

  getAllDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.baseUrl);
  }



deleteDriver(id: number): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/${id}`);
}

}
