import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
  imports: [
    NgForOf
  ]
})
export class DashboardComponent implements OnInit {
  categories = [
    { name: 'Autos', route: 'cars' }, //imageUrl: 'assets/images/cars.png'
    { name: 'Motorräder', route: 'motorbikes' },// imageUrl: 'assets/images/motorbikes.png'
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  viewVehicles(category: { route: string }): void {
    this.router.navigate([`/vehicles/${category.route}`]);
  }
}
