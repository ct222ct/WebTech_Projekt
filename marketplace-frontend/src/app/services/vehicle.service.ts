import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private apiUrl = 'http://localhost:3000/api/vehicles';

  constructor(private http: HttpClient) {}

  getUserVehicles(): Observable<any[]> {
    return this.http.get<any[]>('/api/vehicles/user');
  }

  deleteVehicle(vehicleId: number): Observable<any> {
    return this.http.delete(`/api/vehicles/${vehicleId}`);
  }

  updateVehicle(vehicle: any): Observable<any> {
    return this.http.put(`/api/vehicles/${vehicle.id}`, vehicle);
  }

}
