import { Component, OnInit } from '@angular/core';
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

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  viewCategoryDetails(category: any): void {
    // Weiterleitung zur Detailseite
    console.log('Kategorie gewählt:', category);
  }
}
