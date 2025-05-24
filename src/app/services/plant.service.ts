import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  private plantsUrl = 'http://localhost:3000/plants';
  constructor(private http: HttpClient) {}

  getPlants() {
    return this.http.get(this.plantsUrl);
  }

  addPlant(data: any) {
    return this.http.post(this.plantsUrl, data);
  }
}
