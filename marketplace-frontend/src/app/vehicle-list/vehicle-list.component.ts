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
    console.log('Komponente initialisiert');
    this.route.params.subscribe((params) => {
      console.log('API wird aufgerufen mit Kategorie:', params['category']);
      this.fetchVehicles(params['category']);
    });
  }

  fetchVehicles(category: string): void {
    this.http.get<any[]>(`http://localhost:3000/api/vehicles/${category}`).subscribe({
      next: (data) => {
        console.log('Erhaltene API-Daten:', data);
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
