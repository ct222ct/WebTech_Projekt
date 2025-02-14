import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { UserService } from '../services/user.service';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms'; // Import UserService

@Component({
  selector: 'app-seller-listings',
  templateUrl: './seller-listings.component.html',
  styleUrls: ['./seller-listings.component.less'],
  imports: [
    NgIf,
    NgForOf,
    FormsModule
  ]
})
export class SellerListingsComponent implements OnInit {
  isLoading: boolean = true;
  user: any = null;
  vehicles: any[] = [];
  isModalOpen: boolean = false; // Controls modal visibility
  models: any[] = []; // Models from DB
  types: any[] = []; // Types from DB
  newVehicle: any = {
    name: '',
    modelId: '', // Will be selected from dropdown
    typeId: '', // Will be selected from dropdown
    description: '',
    price: 0,
    dateOfFirstRegistration: '',
    mileage: 0,
    fuelType: '',
    color: '',
    condition: '',
    images: []
  };
  editedVehicle: any = {}; // Hier werden die vorhandenen Fahrzeugdaten gespeichert
  isEditModalOpen: boolean = false; // Steuert die Sichtbarkeit des Bearbeitungsmodals

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserAndListings();
    this.loadModelsAndTypes();

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
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.put(`http://localhost:3000/api/vehicles/mark-sold/${vehicleId}`, {}, { headers })
      .subscribe({
        next: () => {
          console.log(`Vehicle ${vehicleId} marked as sold`);
          this.loadUserAndListings(); // Refresh list
        },
        error: (err) => console.error('Error marking vehicle as sold:', err),
      });
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  loadModelsAndTypes(): void {
    // Lade die Modelle
    this.http.get<any[]>('http://localhost:3000/api/models').subscribe({
      next: (data) => {
        this.models = data;
        console.log('Geladene Modelle:', this.models);
      },
      error: (error) => {
        console.error('Fehler beim Laden der Modelle:', error);
      }
    });

    // Lade die Typen
    this.http.get<any[]>('http://localhost:3000/api/types').subscribe({
      next: (data) => {
        this.types = data;
        console.log('Geladene Typen:', this.types);
      },
      error: (error) => {
        console.error('Fehler beim Laden der Typen:', error);
      }
    });
  }
  addVehicle(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Kein Token gefunden! Benutzer ist nicht eingeloggt.');
      return;
    }

    this.userService.getUserData().subscribe(user => {
      console.log('Benutzer-ID erhalten:', user.id);

      this.newVehicle.userId = user.id; //  Benutzer-ID setzen

      this.http.post('http://localhost:3000/api/vehicles', this.newVehicle, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      }).subscribe({
        next: (vehicle) => {
          console.log('Fahrzeug erfolgreich hinzugefügt:', vehicle);
          this.vehicles.push(vehicle);
          this.newVehicle = {}; // Reset form
          this.closeModal();
        },
        error: (error) => {
          console.error('Fehler beim Hinzufügen des Fahrzeugs:', error);
        }
      });
    });
  }



  openEditModal(vehicle: any): void {
    this.editedVehicle = { ...vehicle }; // Kopie der Fahrzeugdaten speichern
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  updateVehicle(): void {
    const token = localStorage.getItem('token'); // Token aus LocalStorage abrufen
    if (!token) {
      console.error('Kein Token gefunden!');
      return;
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.put(`http://localhost:3000/api/vehicles/${this.editedVehicle.id}`, this.editedVehicle, { headers })
      .subscribe({
        next: () => {
          console.log('✅ Fahrzeug erfolgreich aktualisiert.');
          this.fetchSellerListings(); // Fahrzeugliste neu laden
          this.closeEditModal(); // Modal schließen
        },
        error: (error) => {
          console.error('❌ Fehler beim Aktualisieren des Fahrzeugs:', error);
        }
      });
  }


  deleteVehicle(vehicleId: number): void {
    const token = localStorage.getItem('token'); // 🔹 Token abrufen
    if (!token) {
      console.error('❌ Kein Token gefunden im LocalStorage');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http.delete(`http://localhost:3000/api/vehicles/${vehicleId}`, { headers }).subscribe({
      next: () => {
        this.vehicles = this.vehicles.filter(v => v.id !== vehicleId);
        console.log('✅ Fahrzeug erfolgreich gelöscht:', vehicleId);
      },
      error: (error) => {
        console.error('❌ Fehler beim Löschen des Fahrzeugs:', error);
      }
    });
  }

}
