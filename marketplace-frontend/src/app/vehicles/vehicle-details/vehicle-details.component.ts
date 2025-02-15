import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  imports: [
    NgIf,
    NgForOf
  ],
  styleUrls: ['./vehicle-details.component.less']
})
export class VehicleDetailsComponent implements OnInit {
  vehicle: any = null;
  isLoading: boolean = true;
  images: string[] = []; // Speichert Bilder

  constructor(private route: ActivatedRoute, private http: HttpClient, private location: Location) {}

  ngOnInit(): void {
    const vehicleId = this.route.snapshot.paramMap.get('id'); // Fahrzeug-ID aus URL holen
    if (vehicleId) {
      this.loadVehicleDetails(vehicleId);
      this.loadVehicleImages(vehicleId);
    }
  }

  loadVehicleDetails(vehicleId: string): void {
    console.log('Lade Fahrzeugdetails für ID:', vehicleId);

    this.http.get(`http://localhost:3000/api/vehicles/all-vehicle/${vehicleId}`).subscribe({
      next: (data) => {
        console.log('Fahrzeugdaten empfangen:', data);
        this.vehicle = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Fehler beim Laden der Fahrzeugdetails:', error);
        this.isLoading = false;
      },
    });
  }

  loadVehicleImages(vehicleId: string): void {
    console.log('Lade Bilder für Fahrzeug ID:', vehicleId);

    this.http.get<any[]>(`http://localhost:3000/api/vehicles/images/${vehicleId}`).subscribe({
      next: (images) => {
        console.log(`Empfangene Bilder für Fahrzeug ${vehicleId}:`, images);
        if (images.length > 0) {
          this.images = images.map(img => img.url.startsWith('/uploads/')
            ? `http://localhost:3000${img.url}`
            : img.url
          );
        }
      },
      error: (error) => {
        console.error('Fehler beim Laden der Fahrzeugbilder:', error);
      },
    });
  }

  goBack(): void {
    this.location.back();
  }
}
