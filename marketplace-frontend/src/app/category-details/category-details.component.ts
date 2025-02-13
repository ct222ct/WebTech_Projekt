import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.less'],
  imports: [
    NgForOf
  ]
})
export class CategoryDetailsComponent implements OnInit {
  categoryName: string = '';
  marks: any[] = [];
  types: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    const categoryId = this.route.snapshot.params['id'];
    this.loadDetails(categoryId);
  }

  loadDetails(categoryId: number): void {
    this.categoryService.getMarksByCategory(categoryId).subscribe((data) => {
      this.marks = data;
    });

    this.categoryService.getTypesByCategory(categoryId).subscribe((data) => {
      this.types = data;
    });
  }
}
