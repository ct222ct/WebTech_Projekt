import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-motorbikes',
  templateUrl: './motorbikes.component.html',
  styleUrls: ['./motorbikes.component.less'],
  imports: [
    NgIf,
    NgForOf,
    FormsModule
  ]
})
export class MotorbikesComponent implements OnInit {
  marks: any[] = []; // Liste der Marken
  models: any[] = []; // Liste der Modelle
  vehicles: any[] = []; // Gefilterte Fahrzeugliste
  selectedMark: string = ''; // Gewählte Marke
  selectedModel: string = ''; // Gewähltes Modell
  isLoading: boolean = false; // Ladespinner anzeigen

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('CarsComponent initialisiert');
    this.loadMarks();
  }

  // Marken aus der Datenbank abrufen
  loadMarks(): void {
    this.http.get<any[]>('http://localhost:3000/api/marks').subscribe({
      next: (data) => {
        this.marks = data;
        console.log('Geladene Marken:', this.marks);
      },
      error: (error) => {
        console.error('Fehler beim Laden der Marken:', error);
      }
    });
  }

  // Modelle basierend auf der gewählten Marke abrufen
  loadModels(): void {
    if (!this.selectedMark) return; // Falls keine Marke gewählt wurde, abbrechen

    this.http.get<any[]>(`http://localhost:3000/api/models/${this.selectedMark}`).subscribe({
      next: (data) => {
        this.models = data;
        console.log('Geladene Modelle:', this.models);
      },
      error: (error) => {
        console.error('Fehler beim Laden der Modelle:', error);
      }
    });
  }

  // Fahrzeuge basierend auf der gewählten Marke und ggf. Modell abrufen
  searchVehicles(): void {
    this.isLoading = true;
    let url = `http://localhost:3000/api/vehicles?mark=${this.selectedMark}`;
    if (this.selectedModel) {
      url += `&model=${this.selectedModel}`;
    }

    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        this.vehicles = data;
        console.log('Gefilterte Fahrzeuge:', this.vehicles);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Fehler beim Abrufen der Fahrzeuge:', error);
        this.isLoading = false;
      }
    });
  }
  loadMotorbikes(): void {
    this.http.get<any[]>('http://localhost:3000/api/vehicles/types/2').subscribe({
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
