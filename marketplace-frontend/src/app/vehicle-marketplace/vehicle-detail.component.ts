import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehicleMarketplaceService } from '../vehicle-marketplace/vehicle-marketplace.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.less'],
  imports: [
    NgIf
  ]
})
export class VehicleDetailComponent implements OnInit {
  vehicle: any;

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleMarketplaceService
  ) {}

  ngOnInit(): void {
    const vehicleId = this.route.snapshot.params['id'];
    this.vehicleService.getVehicle(vehicleId).subscribe((vehicle) => {
      this.vehicle = vehicle;
    });
  }
}
