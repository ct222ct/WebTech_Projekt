import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root', // Stellt sicher, dass der Service global bereitgestellt wird
})
export class VehicleMarketplaceService {
  private apiUrl = 'http://localhost:3000/api/vehicles';

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get(`${this.apiUrl}/categories`);
  }

  getMarks(categoryId: number) {
    return this.http.get(`${this.apiUrl}/marks/${categoryId}`);
  }

  getModels(markId: number) {
    return this.http.get(`${this.apiUrl}/models/${markId}`);
  }

  getVehicleTypes(categoryId: number) {
    return this.http.get(`${this.apiUrl}/vehicle-types/${categoryId}`);
  }
}
