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
  getPlantsById(id: string): Observable<Plants> {
    return this.http.get<Plants>(`${this.plantsUrl}/${id}`);
  }

  addPlant(data: any) {
    return this.http.post(this.plantsUrl, data);
  }

  getPlantsByClientId(clientId: string): Observable<Plants[]> {
    return this.http.get<Plants[]>(`${this.plantsUrl}?idClient=${clientId}`);
  }

  updatePlant(plant: Plants) {
    return this.http.put(`${this.plantsUrl}/${plant.id}`, plant);
  }

  deletePlant(id: number) {
    return this.http.delete(`${this.plantsUrl}/${id}`);
  }
}
