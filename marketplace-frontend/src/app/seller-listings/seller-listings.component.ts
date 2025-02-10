import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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
  vehicles: any[] = [];

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserAndListings();

  }

  loadUserAndListings(): void {
    this.userService.getUserData().subscribe({
      next: (user) => {
        console.log('Benutzer erfolgreich geladen:', user);
        this.fetchSellerListings();
      },
      error: (err) => {
        console.error('Fehler beim Abrufen der Benutzerdaten:', err);
        this.isLoading = false;
      }
    });
  }

  fetchSellerListings(): void {
    const token = localStorage.getItem('token'); // Token abrufen

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http.get<any[]>('http://localhost:3000/api/vehicles/seller/listings', { headers }).subscribe({
      next: (data) => {
        console.log('Empfangene Fahrzeugdaten:', data);
        this.vehicles = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Fehler beim Abrufen der Fahrzeuglisten:', err);
        this.isLoading = false;
      }
    });
  }



markAsSold(vehicleId: number): void {

    this.http.put(`http://localhost:3000/api/vehicles/${vehicleId}/mark-as-sold`, {}).subscribe({
      next: (response) => {
        console.log('Vehicle marked as sold:', response);
        this.fetchSellerListings(); // Reload listings
      },
      error: (error) => {
        console.error('Error marking vehicle as sold:', error);
      },
    });
  }

}
