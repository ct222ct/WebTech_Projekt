import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import {NgForOf, NgIf} from '@angular/common'; // Import UserService

@Component({
  selector: 'app-seller-listings',
  templateUrl: './seller-listings.component.html',
  styleUrls: ['./seller-listings.component.less'],
  imports: [
    NgIf,
    NgForOf
  ]
})
export class SellerListingsComponent implements OnInit {
  listings: any[] = [];
  isLoading: boolean = true;
  user: any = null;

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserAndListings();
  }

  loadUserAndListings(): void {
    this.userService.getUserData().subscribe({
      next: (user) => {
        this.user = user;
        console.log('User loaded:', user);
        this.fetchSellerListings(user.id); // Pass the user ID to fetch listings
      },
      error: (error) => {
        console.error('Error loading user data:', error);
        this.isLoading = false;
      },
    });
  }

  fetchSellerListings(userId: number): void {
    this.http.get<any[]>(`http://localhost:3000/api/vehicles/seller/listings?userId=${userId}`).subscribe({
      next: (data) => {
        console.log('Seller Listings:', data);
        this.listings = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching seller listings:', error);
        this.isLoading = false;
      },
    });
  }



markAsSold(vehicleId: number): void {

    this.http.put(`http://localhost:3000/api/vehicles/${vehicleId}/mark-as-sold`, {}).subscribe({
      next: (response) => {
        console.log('Vehicle marked as sold:', response);
        this.fetchSellerListings(this.user.id); // Reload listings
      },
      error: (error) => {
        console.error('Error marking vehicle as sold:', error);
      },
    });
  }

}
