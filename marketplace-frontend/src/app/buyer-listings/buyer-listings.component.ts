import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-buyer-listings',
  templateUrl: './buyer-listings.component.html',
  styleUrls: ['./buyer-listings.component.less'],
  imports: [
    FormsModule,
    NgForOf,
    NgOptimizedImage,
    NgIf
  ]
})
export class BuyerListingsComponent implements OnInit {
  categories: any[] = [];
  marks: any[] = [];
  models: any[] = [];
  vehicles: any[] = [];

  selectedCategory: string = '';
  selectedMark: string = '';
  selectedModel: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.http.get<any[]>('http://localhost:3000/api/categories').subscribe(data => {
      this.categories = data;
    });
  }

  onCategoryChange(): void {
    if (!this.selectedCategory) return;

    this.http.get<any[]>(`http://localhost:3000/api/categories/${this.selectedCategory}/marks`)
      .subscribe(data => this.marks = data);
  }

  onMarkChange(): void {
    if (!this.selectedMark) return;

    this.http.get<any[]>(`http://localhost:3000/api/marks/${this.selectedMark}/models`)
      .subscribe(data => this.models = data);
  }

  fetchVehicles(): void {
    this.http.get<any[]>(`http://localhost:3000/api/vehicles/browse?categoryId=${this.selectedCategory}&markId=${this.selectedMark}&modelId=${this.selectedModel}`)
      .subscribe(data => {
        this.vehicles = data;
      });
  }
}
