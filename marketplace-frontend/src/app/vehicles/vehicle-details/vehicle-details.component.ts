import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {Location} from '@angular/common';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  imports: [
    NgIf,
    NgOptimizedImage
  ],
  styleUrls: ['./vehicle-details.component.less']
})
export class VehicleDetailsComponent implements OnInit {
  vehicle: any = null;
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute, private http: HttpClient, private location: Location) {
  }

  ngOnInit(): void {
    const vehicleId = this.route.snapshot.paramMap.get('id'); // Get ID from URL
    this.loadVehicleDetails(vehicleId);
  }

  loadVehicleDetails(vehicleId: string | null): void {
    if (!vehicleId) return;
    console.log('vehicleId:', vehicleId);
    this.http.get(`http://localhost:3000/api/vehicles/all-vehicle/${vehicleId}`).subscribe({
      next: (data) => {
        console.log('data:', data);
        this.vehicle = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Fehler beim Laden der Fahrzeugdetails:', error);
        this.isLoading = false;
      },
    });
  }

  goBack(): void {
    this.location.back();
  }
}
