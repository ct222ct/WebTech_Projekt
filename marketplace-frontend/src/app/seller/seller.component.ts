import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./seller.component.less']
})
export class SellerComponent {
  vehicleForm: FormGroup;
  selectedFiles: File[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.vehicleForm = this.fb.group({
      name: [''],
      model: [''],
      type: [''],
      description: [''],
      price: [''],
      dateOfFirstRegistration: [''],
      mileage: [''],
      fuelType: [''],
      color: [''],
      condition: ['new'],
    });
  }

  onFileSelect(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }

  onSubmit(): void {
    const formData = new FormData();
    Object.keys(this.vehicleForm.value).forEach((key) => {
      formData.append(key, this.vehicleForm.value[key]);
    });

    this.selectedFiles.forEach((file) => {
      formData.append('pictures', file);
    });

    this.http.post('http://localhost:3000/api/vehicles', formData).subscribe({
      next: (response) => {
        console.log('Vehicle added:', response);
      },
      error: (error) => {
        console.error('Error adding vehicle:', error);
      },
    });
  }
}
