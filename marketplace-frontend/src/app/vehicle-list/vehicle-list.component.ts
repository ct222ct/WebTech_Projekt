import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.less'],
  imports: [
    NgIf,
    NgForOf
  ]
})
export class VehicleListComponent implements OnInit {
  category: string = '';
  vehicles: any[] = [];
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    // Kategorie aus den Routen-Parametern abrufen
    this.route.params.subscribe((params) => {
      this.category = params['category'];
      this.fetchVehicles();
    });
  }

  fetchVehicles(): void {
    // API-Aufruf zum Abrufen der Fahrzeugdaten
    this.http
      .get<any[]>(`http://localhost:3000/api/vehicles/${this.category}`)
      .subscribe({
        next: (data) => {
          this.vehicles = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Fehler beim Abrufen der Fahrzeugdaten:', error);
          this.isLoading = false;
        },
      });
  }
}
