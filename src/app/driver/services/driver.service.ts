import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/drivers/me`);
  }

  updateProfile(profile: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/drivers/me`, profile);
  }

  getAssignedRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/requests/assigned`);
  }

  getRequestById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/requests/${id}`);
  }

  updateStatus(id: string, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/requests/${id}/status`, { status });
  }

  confirmPayment(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/requests/${id}/payment`, { confirmed: true });
  }
}
