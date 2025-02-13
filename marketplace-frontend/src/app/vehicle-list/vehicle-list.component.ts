import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.less'],
  imports: [
    NgIf,
    NgForOf,
  ]
})
export class VehicleListComponent implements OnInit {
  cars: any[] = [];
  motorbikes: any[] = [];
  isLoading: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('Fahrzeugliste wird geladen');
    this.fetchVehicles();
  }

  fetchVehicles(): void {
    // Autos abrufen
    this.http.get<any[]>('http://localhost:3000/api/vehicles/types/1').subscribe({
      next: (data) => {
        console.log('Autos:', data);
        this.cars = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Fehler beim Abrufen der Autos:', error);
        this.isLoading = false;
      },
    });

    // Motorräder abrufen
    this.http.get<any[]>('http://localhost:3000/api/vehicles/types/2').subscribe({
      next: (data) => {
        console.log('Motorräder:', data);
        this.motorbikes = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Fehler beim Abrufen der Motorräder:', error);
        this.isLoading = false;
      },
    });
  }

  viewDetails(vehicle: any): void {
    console.log('Details für Fahrzeug:', vehicle);
    // Hier können Sie weitere Logik wie Routing oder Modals implementieren
  }
}
