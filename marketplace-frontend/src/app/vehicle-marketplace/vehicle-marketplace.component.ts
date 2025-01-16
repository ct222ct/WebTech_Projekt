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
  vehicles: any[] = [];
  totalVehicles: number = 0;
  currentPage: number = 1;
  vehiclesPerPage: number = 10;

  filters = {
    name: '',
    model: null,
    type: null,
    priceMin: null,
    priceMax: null,
    condition: null,
  };

  constructor(private vehicleService: VehicleMarketplaceService) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.vehicleService
      .searchVehicles(this.currentPage, this.vehiclesPerPage, this.filters)
      .subscribe((response: any) => {
        this.vehicles = response.data;
        this.totalVehicles = response.total;
      },
    (error) => {
      alert('Failed to load vehicles. Please try again later.');
    }
  );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadVehicles();
  }

  onFilterChange(): void {
    this.currentPage = 1; // Zurück zur ersten Seite
    this.loadVehicles();
  }

  protected readonly Math = Math;
}
