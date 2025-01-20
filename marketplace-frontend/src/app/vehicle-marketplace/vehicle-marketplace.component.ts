import { Component, OnInit } from '@angular/core';
import { VehicleMarketplaceService } from './vehicle-marketplace.service';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-vehicle-marketplace',
  templateUrl: './vehicle-marketplace.component.html',
  styleUrls: ['./vehicle-marketplace.component.less'],
  imports: [
    FormsModule,
    NgForOf
  ]
})
export class VehicleMarketplaceComponent implements OnInit {
  // Daten für die Startseite
  categories: any[] = [];
  marks: any[] = [];
  models: any[] = [];
  vehicleTypes: any[] = [];
  vehicles: any[] = [];
  totalVehicles: number = 0;

  // Filter und Pagination
  currentPage: number = 1;
  vehiclesPerPage: number = 10;
  filters = {
    mark: null as number | null,
    model: null as number | null,
    type: null as number | null,
    priceMin: null as number | null,
    priceMax: null as number | null,
    condition: null as string | null,
  };

  constructor(private vehicleService: VehicleMarketplaceService) {}

  ngOnInit(): void {
    // Lade die Kategorien und initialisiere die Fahrzeugliste
    this.vehicleService.getCategories().subscribe((categories: any) => {
      this.categories = categories;
      if (categories.length > 0) {
        this.onCategoryChange(categories[0].id); // Standard: Wähle die erste Kategorie
      }
    });
  }

  onCategoryChange(categoryId: number): void {
    // Kategorie ändern: Lade die Marken und Typen
    this.vehicleService.getMarks(categoryId).subscribe((marks: any) => {
      this.marks = marks;
      this.filters.mark = null; // Filter zurücksetzen
    });

    this.vehicleService.getVehicleTypes(categoryId).subscribe((types: any) => {
      this.vehicleTypes = types;
      this.filters.type = null; // Filter zurücksetzen
    });

    // Aktualisiere die Fahrzeugliste basierend auf der Kategorie
    this.loadVehicles();
  }

  onMarkChange(event: Event): void {
    const target = event.target as HTMLSelectElement; // Typumwandlung auf HTMLSelectElement
    const markId = Number(target.value); // Wert in eine Zahl umwandeln
    this.filters.mark = markId;

    // Modelle basierend auf der ausgewählten Marke laden
    this.vehicleService.getModels(markId).subscribe((models: any) => {
      this.models = models;
      this.filters.model = null; // Modell-Filter zurücksetzen
    });
  }


  loadVehicles(): void {
    // Lade Fahrzeuge basierend auf aktuellen Filtern und der Seite
    this.vehicleService
      .searchVehicles(this.currentPage, this.vehiclesPerPage, this.filters)
      .subscribe((response: any) => {
        this.vehicles = response.data;
        this.totalVehicles = response.total;
      });
  }

  onFilterChange(): void {
    // Filter ändern: Setze die Seite zurück und lade Fahrzeuge neu
    this.currentPage = 1;
    this.loadVehicles();
  }

  onPageChange(page: number): void {
    // Seite ändern: Lade Fahrzeuge für die neue Seite
    this.currentPage = page;
    this.loadVehicles();
  }

  viewDetails(vehicleId: number): void {
    // Navigation zu den Fahrzeugdetails
    window.location.href = `/vehicle/${vehicleId}`;
  }

  protected readonly Math = Math;
}
