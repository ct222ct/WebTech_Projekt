import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/api/categories'; // Backend-URL

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getMarksByCategory(categoryId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${categoryId}/marks`);
  }

  getTypesByCategory(categoryId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${categoryId}/types`);
  }
}

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private apiUrl = 'http://localhost:3000/api/vehicles';

  constructor(private http: HttpClient) {}

  getVehiclesByModel(modelId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/models/${modelId}`);
  }

  getVehiclesByType(typeId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/types/${typeId}`);
  }
}
