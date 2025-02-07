import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.less'],
  imports: [
    NgForOf
  ]
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  viewVehicles(category: any): void {
    if (category.name === 'Cars') {
      this.router.navigate(['/vehicles/cars']);
    } else if (category.name === 'Motorbikes') {
      this.router.navigate(['/vehicles/motorbikes']);
    }
  }
}
