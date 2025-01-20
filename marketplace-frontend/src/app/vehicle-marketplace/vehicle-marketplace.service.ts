import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root', // Stellt sicher, dass der Service global bereitgestellt wird
})
export class VehicleMarketplaceService {
  private apiUrl = 'http://localhost:3000/api/vehicles';

  constructor(private http: HttpClient) {}

  getVehicles() {
    return this.http.get(`${this.apiUrl}`);
  }

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
  searchVehicles(page: number, limit: number, filters: any) {
    let params: any = { page, limit, ...filters };
    return this.http.get(`${this.apiUrl}/search`, { params });
  }
  getVehicle(vehicleId: number) {
    return this.http.get(`${this.apiUrl}/${vehicleId}`);
  }
  addVehicle(formData: FormData) {
    return this.http.post(`${this.apiUrl}/`, formData);
  }


}
