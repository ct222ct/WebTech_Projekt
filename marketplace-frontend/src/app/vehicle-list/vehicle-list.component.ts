// Importiert die benötigten Angular-Module für HTTP-Anfragen und Direktiven
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForOf, NgIf } from '@angular/common';

// Deklariert die Fahrzeuglisten-Komponente
@Component({
  selector: 'app-vehicle-list', // Definiert den CSS-Selektor für die Komponente
  templateUrl: './vehicle-list.component.html', // Verweist auf die HTML-Template-Datei der Komponente
  styleUrls: ['./vehicle-list.component.less'], // Verweist auf die zugehörige Stylesheet-Datei
  imports: [
    NgIf, // Ermöglicht die Nutzung von *ngIf für bedingte Anzeige
    NgForOf, // Ermöglicht die Nutzung von *ngFor für Listen
  ]
})
export class VehicleListComponent implements OnInit {
  cars: any[] = []; // Speichert die Liste der Autos
  motorbikes: any[] = []; // Speichert die Liste der Motorräder
  isLoading: boolean = true; // Zeigt den Ladezustand der Daten an

  constructor(private http: HttpClient) {}

  // Wird beim Initialisieren der Komponente aufgerufen
  ngOnInit(): void {
    this.fetchVehicles();
  }

  /**
   * Ruft die Fahrzeuglisten für Autos und Motorräder ab
   */
  fetchVehicles(): void {
    // Autos abrufen (Fahrzeugtyp 1)
    this.http.get<any[]>('http://localhost:3000/api/vehicles/types/1').subscribe({
      next: (data) => {
        this.cars = data; // Speichert die Autos in der Liste
        this.isLoading = false; // Setzt den Ladezustand auf false
      },
      error: (error) => {
        console.error('Fehler beim Abrufen der Autos:', error);
        this.isLoading = false;
      },
    });

    // Motorräder abrufen (Fahrzeugtyp 2)
    this.http.get<any[]>('http://localhost:3000/api/vehicles/types/2').subscribe({
      next: (data) => {
        this.motorbikes = data; // Speichert die Motorräder in der Liste
        this.isLoading = false; // Setzt den Ladezustand auf false
      },
      error: (error) => {
        console.error('Fehler beim Abrufen der Motorräder:', error);
        this.isLoading = false;
      },
    });
  }

  /**
   * Öffnet die Detailansicht für ein Fahrzeug
   * @param vehicle - Das ausgewählte Fahrzeug
   */
  viewDetails(vehicle: any): void {
    console.log('Details für Fahrzeug:', vehicle);
    // Hier können Sie z. B. ein Modal öffnen oder zur Detailseite navigieren
  }
}
