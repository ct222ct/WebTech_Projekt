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
  marks: any[] = [];   // 🚀 Enthält NUR Marken der Kategorie Auto (1)
  models: any[] = [];
  vehicleTypes: any[] = [];
  selectedCategory: string = '2'; // Default: Autos
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
        //console.log('Geladene Marken:', this.marks);
      },
      error: (error) => {
        console.error('Fehler beim Laden der Marken:', error);
      },
    });
  }

  //Lädt Modelle basierend auf der ausgewählten Marke
  loadModels(): void {
    //console.log(this.selectedModel);
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

    // Prüfen, ob KEIN Filter gesetzt wurde -> Alle Fahrzeuge laden
    if (queryParams.toString() === '') {
      console.log('Keine Filter gesetzt, lade alle Fahrzeuge');
      this.loadAllVehicles();
      return;
    }

    // Falls Filter gesetzt sind, gefilterte Suche durchführen
    this.http.get<any[]>(`http://localhost:3000/api/vehicles/searchMark/listings?${queryParams.toString()}`)
      .subscribe({
        next: (data) => {
          console.log('Gefilterte Fahrzeuge:', data);
          this.vehicles = data;
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

    // Zurückgesetzte Werte sofort übernehmen
    this.models = []; // Falls Marke zurückgesetzt wurde, auch Modelle leeren

    // Alle Fahrzeuge neu laden
    this.loadAllVehicles();
  }


}
