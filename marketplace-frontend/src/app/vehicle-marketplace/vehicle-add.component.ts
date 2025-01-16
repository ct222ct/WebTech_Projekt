import { Component } from '@angular/core';
import { VehicleMarketplaceService } from './vehicle-marketplace.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.less'],
  imports: [
    FormsModule
  ]
})
export class VehicleAddComponent {
  vehicle = {
    name: '',
    description: '',
    price: 0,
    registrationDate: '',
    mileage: 0,
    fuelType: 'Petrol',
    color: '',
    condition: 'new',
    modelId: null,
    typeId: null,
  };
  pictures: File[] = [];

  constructor(private vehicleService: VehicleMarketplaceService) {}

  onFileChange(event: any): void {
    this.pictures = Array.from(event.target.files);
  }

  addVehicle(): void {
    const formData = new FormData();

    Object.keys(this.vehicle).forEach((key) => {
      formData.append(key, (this.vehicle as any)[key]);
    });

    this.pictures.forEach((file) => formData.append('pictures', file));

    this.vehicleService.addVehicle(formData).subscribe(
      (response) => {
        alert('Vehicle added successfully!');
      },
      (error) => {
        alert('Failed to add vehicle.');
      }
    );
  }
}
