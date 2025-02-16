// Importiert die benötigten Angular-Module für HTTP-Anfragen, Formulare und Routing
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

// Deklariert die Fahrzeug-Kategorie "Motorräder" als eigenständige Komponente
@Component({
  selector: 'app-motorbikes', // Definiert den CSS-Selektor für die Komponente
  templateUrl: './motorbikes.component.html', // Verweist auf die HTML-Template-Datei der Komponente
  styleUrls: ['./motorbikes.component.less'], // Verweist auf die zugehörige Stylesheet-Datei
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf, RouterLink], // Importiert Formulare, Direktiven und RouterLink
})
export class MotorbikesComponent implements OnInit {
  vehicles: any[] = []; // Speichert die geladenen Motorräder
  marks: any[] = []; // Speichert die Motorradmarken
  models: any[] = []; // Speichert die Motorradmodelle
  vehicleTypes: any[] = []; // Speichert die Motorradtypen

  // Suchfilter-Optionen
  selectedCategory: string = '2'; // Standardmäßig Motorräder (Kategorie 2)
  selectedMarke: string = ''; // Ausgewählte Marke
  selectedModel: string = ''; // Ausgewähltes Modell
  selectedVehicleType: string = ''; // Ausgewählter Fahrzeugtyp
  priceMin: number | null = null; // Mindestpreis
  priceMax: number | null = null; // Maximalpreis
  sellerCity: string = ''; // Stadt des Verkäufers
  mileageMin: number | null = null; // Mindestkilometerstand
  mileageMax: number | null = null; // Maximalkilometerstand
  firstRegistrationMin: string = ''; // Frühestes Baujahr
  firstRegistrationMax: string = ''; // Spätestes Baujahr
  fuelType: string = ''; // Kraftstoffart
  color: string = ''; // Farbe des Motorrads
  condition: string = ''; // Zustand (neu/gebraucht)

  isLoading: boolean = false; // Steuert die Ladeanzeige
  showAdvancedFilters: boolean = false; // Steuerung für erweiterte Filteroptionen

  constructor(private http: HttpClient, private router: Router) {}

  // Wird beim Initialisieren der Komponente aufgerufen
  ngOnInit(): void {
    this.loadMarks(); // Lädt Marken für Motorräder (Kategorie 2)
    this.loadAllVehicles(); // Lädt alle Motorräder der Kategorie
    this.loadVehicleTypes(); // Lädt die verfügbaren Motorradtypen
  }

  /**
   * Zeigt oder versteckt die erweiterten Filteroptionen
   */
  toggleFilters(): void {
    this.showAdvancedFilters = !this.showAdvancedFilters;
  }

  /**
   * Lädt alle Fahrzeuge der Kategorie Motorräder
   */
  loadAllVehicles(): void {
    this.isLoading = true;
    this.http.get<any[]>(`http://localhost:3000/api/vehicles/category/${this.selectedCategory}`).subscribe({
      next: (data) => {
        this.vehicles = data;

        // Lade Bilder für jedes Fahrzeug
        this.vehicles.forEach(vehicle => {
          this.http.get<any[]>(`http://localhost:3000/api/vehicles/images/${vehicle.id}`)
            .subscribe({
              next: (images) => {
                vehicle.pictures = images;
              },
              error: (error) => {
                console.error(`Fehler beim Abrufen der Bilder für Fahrzeug ${vehicle.id}:`, error);
              }
            });
        });

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Fehler beim Laden der Fahrzeuge:', error);
        this.isLoading = false;
      },
    });
  }

  /**
   * Lädt nur die Motorradmarken der Kategorie Motorrad (categoryId=2)
   */
  loadMarks(): void {
    this.http.get<any[]>(`http://localhost:3000/api/marks/${this.selectedCategory}`).subscribe({
      next: (data) => {
        this.marks = data;
      },
      error: (error) => {
        console.error('Fehler beim Laden der Motorrad-Marken:', error);
      },
    });
  }

  /**
   * Lädt Motorradmodelle basierend auf der ausgewählten Marke
   */
  loadModels(): void {
    if (!this.selectedMarke) {
      this.models = [];
      return;
    }
    this.http.get<any[]>(`http://localhost:3000/api/models/${this.selectedMarke}`).subscribe({
      next: (data) => {
        this.models = data;
      },
      error: (error) => {
        console.error('Fehler beim Laden der Modelle:', error);
      },
    });
  }

  /**
   * Lädt Fahrzeugtypen basierend auf der Kategorie
   */
  loadVehicleTypes(): void {
    this.http.get<any[]>(`http://localhost:3000/api/types/${this.selectedCategory}`).subscribe({
      next: (data) => {
        this.vehicleTypes = data;
      },
      error: (error) => {
        console.error('Fehler beim Laden der Motorrad-Typen:', error);
      },
    });
  }

  /**
   * Führt eine Suche mit den ausgewählten Filtern durch
   */
  searchVehicles(): void {
    this.isLoading = true;
    let queryParams = new URLSearchParams();

    if (this.selectedMarke) queryParams.append('markId', this.selectedMarke);
    if (this.selectedModel) queryParams.append('modelId', this.selectedModel);
    if (this.selectedVehicleType) queryParams.append('typeId', this.selectedVehicleType);
    if (this.priceMin) queryParams.append('priceMin', this.priceMin.toString());
    if (this.priceMax) queryParams.append('priceMax', this.priceMax.toString());
    if (this.mileageMin) queryParams.append('mileageMin', this.mileageMin.toString());
    if (this.mileageMax) queryParams.append('mileageMax', this.mileageMax.toString());
    if (this.firstRegistrationMin) queryParams.append('firstRegistrationMin', this.firstRegistrationMin);
    if (this.firstRegistrationMax) queryParams.append('firstRegistrationMax', this.firstRegistrationMax);
    if (this.sellerCity) queryParams.append('city', this.sellerCity);
    if (this.fuelType) queryParams.append('fuelType', this.fuelType);
    if (this.color) queryParams.append('color', this.color);
    if (this.condition) queryParams.append('condition', this.condition);

    if (queryParams.toString() === '') {
      this.loadAllVehicles();
      return;
    }

    this.http.get<any[]>(`http://localhost:3000/api/vehicles/searchMark/listings?${queryParams.toString()}`)
      .subscribe({
        next: (data) => {
          this.vehicles = data;

          // Lade für jedes Fahrzeug die zugehörigen Bilder
          this.vehicles.forEach(vehicle => {
            this.http.get<any[]>(`http://localhost:3000/api/vehicles/images/${vehicle.id}`)
              .subscribe({
                next: (images) => {
                  vehicle.pictures = images;
                },
                error: (error) => {
                  console.error(`Fehler beim Abrufen der Bilder für Fahrzeug ${vehicle.id}:`, error);
                }
              });
          });

          this.isLoading = false;
        },
        error: (error) => {
          console.error('Fehler beim Abrufen der Fahrzeuge:', error);
          this.isLoading = false;
        },
      });
  }

  /**
   * Setzt alle Filter zurück und lädt alle Motorräder erneut
   */
  resetFilters(): void {
    this.selectedMarke = '';
    this.selectedModel = '';
    this.selectedVehicleType = '';
    this.priceMin = null;
    this.priceMax = null;
    this.sellerCity = '';
    this.mileageMin = null;
    this.mileageMax = null;
    this.firstRegistrationMin = '';
    this.firstRegistrationMax = '';
    this.fuelType = '';
    this.color = '';
    this.condition = '';

    this.models = [];
    this.loadAllVehicles();
  }
}
