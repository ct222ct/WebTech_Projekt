import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleMarketplaceService } from './vehicle-marketplace.service';

@Component({
  selector: 'app-vehicle-marketplace',
  standalone: true,
  templateUrl: './vehicle-marketplace.component.html',
  styleUrls: ['./vehicle-marketplace.component.less'],
  imports: [
    CommonModule, // Für Template-Funktionen wie *ngFor
  ],
  })
export class VehicleMarketplaceComponent implements OnInit {
  categories: any[] = [];
  marks: any[] = [];
  models: any[] = [];
  vehicleTypes: any[] = [];
  selectedCategory: number | null = null;
  selectedMark: number | null = null;
  selectedModel: number | null = null;
  selectedType: number | null = null;

  constructor(private vehicleService: VehicleMarketplaceService) {}

  ngOnInit(): void { // OnInit-Methode
    this.vehicleService.getCategories().subscribe((categories: any) => {
      this.categories = categories;
    });
  }

  onCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement; // Explizit typisieren
    const categoryId = Number(target.value); // Konvertiere den Wert in eine Zahl
    this.selectedCategory = categoryId;

    this.vehicleService.getMarks(categoryId).subscribe((marks: any) => {
      this.marks = marks;
    });

    this.vehicleService.getVehicleTypes(categoryId).subscribe((types: any) => {
      this.vehicleTypes = types;
    });
  }

  onMarkChange(event: Event): void {
    const target = event.target as HTMLSelectElement; // Explizit typisieren
    const markId = Number(target.value); // Konvertiere den Wert in eine Zahl
    this.selectedMark = markId;

    this.vehicleService.getModels(markId).subscribe((models: any) => {
      this.models = models;
    });
  }

}
