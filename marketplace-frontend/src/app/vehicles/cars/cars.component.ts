import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf, NgOptimizedImage } from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.less'],
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf, NgOptimizedImage],
})
export class CarsComponent implements OnInit {
  vehicles: any[] = [];
  marks: any[] = [];   // 🚀 Enthält NUR Marken der Kategorie Auto (1)
  models: any[] = [];
  vehicleTypes: any[] = [];
  selectedCategory: string = '1'; // Default: Autos
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
  searchQuery: string = '';
  isLoading: boolean = false;
  showAdvancedFilters: boolean = false;

  fahrzeugID: any;


  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    console.log('CarsComponent initialized');
    this.loadMarks();  //  Lädt NUR Auto-Marken (selectedCategory)
    this.loadAllVehicles(); // Lade alle Fahrzeuge beim Start
    this.loadVehicleTypes();
  }

  toggleFilters(): void {
    this.showAdvancedFilters = !this.showAdvancedFilters;
  }

  loadAllVehicles(): void {
    this.isLoading = true;
    this.http.get<any[]>(`http://localhost:3000/api/vehicles/types/${this.selectedCategory}`).subscribe({
      next: (data) => {
        this.vehicles = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Fehler beim Laden der Fahrzeuge:', error);
        this.isLoading = false;
      },
    });
  }

  // Lädt nur die Marken der Kategorie Auto (categoryId=1)
  loadMarks(): void {
    this.http.get<any[]>(`http://localhost:3000/api/marks/${this.selectedCategory}`).subscribe({
      next: (data) => {
        this.marks = data;
        console.log('Geladene Marken:', this.marks);
      },
      error: (error) => {
        console.error('Fehler beim Laden der Marken:', error);
      },
    });
  }

  //Lädt Modelle basierend auf der ausgewählten Marke
  loadModels(): void {
    console.log(this.selectedModel);
    if (!this.selectedMarke) {
      this.models = [];
      return;
    }
    this.http.get<any[]>(`http://localhost:3000/api/models/${this.selectedMarke}`).subscribe({
      next: (data) => {
        this.models = data;
        console.log('Geladene Modelle:', this.models);
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
        console.error('Fehler beim Laden der Fahrzeugtypen:', error);
      },
    });
  }

  searchVehicles(): void {
    this.isLoading = true;
    let queryParams = new URLSearchParams();

    if (this.searchQuery) queryParams.append('search', this.searchQuery);
    if (this.selectedMarke) queryParams.append('markId', this.selectedMarke);
    if (this.selectedModel) queryParams.append('modelId', this.selectedModel);
    if (this.selectedVehicleType) queryParams.append('vehicleType', this.selectedVehicleType);
    if (this.priceMin !== null) queryParams.append('priceMin', String(this.priceMin));
    if (this.priceMax !== null) queryParams.append('priceMax', String(this.priceMax));
    if (this.sellerCity) queryParams.append('sellerCity', this.sellerCity);
    if (this.mileageMin !== null) queryParams.append('mileageMin', String(this.mileageMin));
    if (this.mileageMax !== null) queryParams.append('mileageMax', String(this.mileageMax));
    if (this.firstRegistrationMin) queryParams.append('firstRegistrationMin', this.firstRegistrationMin);
    if (this.firstRegistrationMax) queryParams.append('firstRegistrationMax', this.firstRegistrationMax);
    if (this.fuelType) queryParams.append('fuelType', this.fuelType);
    if (this.color) queryParams.append('color', this.color);
    if (this.condition) queryParams.append('condition', this.condition);

    this.http.get<any[]>(`http://localhost:3000/api/vehicles?${queryParams.toString()}`).subscribe({
      next: (data) => {
        this.vehicles = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Fehler beim Abrufen der Fahrzeuge:', error);
        this.isLoading = false;
      },
    });
  }

  // Weiterleitung zur Detailseite
  viewDetails(vehicleId: number): void {
    this.router.navigate(['/vehicle-details', vehicleId]);
  }
}
