import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-motorbikes',
  templateUrl: './motorbikes.component.html',
  styleUrls: ['./motorbikes.component.less'],
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf, NgOptimizedImage, RouterLink],
})

export class MotorbikesComponent implements OnInit {
  vehicles: any[] = [];
  marks: any[] = [];   // 🚀 Enthält NUR Marken der Kategorie Motorrad (2)
  models: any[] = [];
  vehicleTypes: any[] = [];
  selectedCategory: string = '2'; // Default: Motorräder
  selectedMarke: string = '';
  selectedModel: string = '';
  selectedVehicleType: string = '';
  priceMin: number | null = null;
  priceMax: number | null = null;
  sellerCity: string = '';
  mileageMin: number | null = null;
  mileageMax: number | null = null;
  firstRegistrationMin: string = '';
  firstRegistrationMax: string = '';
  fuelType: string = '';
  color: string = '';
  condition: string = '';
  isLoading: boolean = false;
  showAdvancedFilters: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    console.log('MotorcyclesComponent initialized');
    this.loadMarks();  // Lädt NUR Motorrad-Marken (selectedCategory = 2)
    this.loadAllVehicles(); // Lade alle Motorräder beim Start
    this.loadVehicleTypes();
  }

  toggleFilters(): void {
    this.showAdvancedFilters = !this.showAdvancedFilters;
  }

  loadAllVehicles(): void {
    this.isLoading = true;
    this.http.get<any[]>(`http://localhost:3000/api/vehicles/category/${this.selectedCategory}`).subscribe({
      next: (data) => {
        console.log('Geladene Fahrzeuge:', data);
        this.vehicles = data;

        // 🚀 Lade für jedes Fahrzeug die zugehörigen Bilder
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


  // Lädt nur die Marken der Kategorie Motorrad (categoryId=2)
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

  // Lädt Modelle basierend auf der ausgewählten Motorrad-Marke
  loadModels(): void {
    if (!this.selectedMarke) {
      this.models = [];
      return;
    }
    this.http.get<any[]>(`http://localhost:3000/api/models/${this.selectedMarke}`).subscribe({
      next: (data) => {
        this.models = data;
        console.log('Geladene Motorrad-Modelle:', this.models);
      },
      error: (error) => {
        console.error('Fehler beim Laden der Modelle:', error);
      },
    });
  }

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

  resetFilters(): void {
    this.selectedMarke = '';
    this.selectedModel = '';
    this.selectedVehicleType = '';
    this.priceMin = null;
    this.priceMax = null;
    this.sellerCity = '';
    this.mileageMin = null;
    this.mileageMax = null;
    this.fuelType = '';
    this.color = '';
    this.condition = '';

    this.models = [];
    this.loadAllVehicles();
  }
}
