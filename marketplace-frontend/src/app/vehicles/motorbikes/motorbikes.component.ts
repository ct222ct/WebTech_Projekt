import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-motorbikes',
  templateUrl: './motorbikes.component.html',
  styleUrls: ['./motorbikes.component.less'],
  imports: [
    NgForOf
  ]
})
export class MotorbikesComponent implements OnInit {
  bikes: any[] = [];

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.loadMotorbikes();
  }

  loadMotorbikes(): void {
    this.vehicleService.getVehiclesByType(2).subscribe((data) => {
      this.bikes = data; // Hier wird angenommen, dass der Typ `2` Motorräder ist
    });
  }
}
