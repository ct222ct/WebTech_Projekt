import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.less'],
  imports: [
    NgIf,
    NgForOf
  ]
})
export class CarsComponent implements OnInit {
  vehicles: any[] = [];
  isLoading: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('CarsComponent initialisiert');
    this.loadCars();
  }

  loadCars(): void {
    this.http.get<any[]>('http://localhost:3000/api/vehicles/types/1').subscribe({
      next: (data) => {
        console.log('API-Daten (vorher):', data);

        // Filter out vehicles that are marked as sold
        this.vehicles = data.filter(vehicle => !vehicle.sold);

        console.log('API-Daten (gefiltert):', this.vehicles);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Fehler beim Abrufen der Fahrzeugdaten:', error);
        this.isLoading = false;
      },
    });
  }
  viewDetails(vehicle: any): void {
    console.log('Details für Fahrzeug:', vehicle);
    // Hier können Sie Routing oder Modalfunktionalitäten implementieren
  }

}
