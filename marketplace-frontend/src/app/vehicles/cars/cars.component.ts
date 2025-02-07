import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.less'],
  imports: [
    NgForOf
  ]
})
export class CarsComponent implements OnInit {
  cars: any[] = [];

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.vehicleService.getVehiclesByType(1).subscribe((data) => {
      this.cars = data; // Hier wird angenommen, dass der Typ `1` Autos ist
    });
  }
}
