import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plants } from '../model/plant.model';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  private plantsUrl = 'http://localhost:3000/plants';
  constructor(private http: HttpClient) {}

  getPlants(): Observable<Plants[]> {
    return this.http.get<Plants[]>(this.plantsUrl);
  }

  addPlant(data: any) {
    return this.http.post(this.plantsUrl, data);
  }
}
