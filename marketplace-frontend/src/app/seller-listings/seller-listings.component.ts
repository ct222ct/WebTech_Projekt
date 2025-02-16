import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { UserService } from '../services/user.service';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
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
  marks: any[] = []; // Marken aus der DB
  categories: any[] = []; // Kategorien aus der DB


  selectedCategory: string = ''; // Kategorie auswählen
  selectedMarkId: string = ''; // Marke auswählen
  //selectedModel: string = ''; // Modell auswählen

  newVehicle: any = {
    categoryId: '', // Will be selected from dropdown
    userId: '', // Will be set from user data
    markId: '', // Will be selected from dropdown
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
  selectedImages: File[] = [];

  editedVehicle: any = {}; // Hier werden die vorhandenen Fahrzeugdaten gespeichert
  isEditModalOpen: boolean = false; // Steuert die Sichtbarkeit des Bearbeitungsmodals

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserAndListings();
    this.loadCategories();

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
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.get<any[]>('http://localhost:3000/api/vehicles/seller/listings', { headers }).subscribe({
      next: (data) => {
        console.log('Empfangene Fahrzeugdaten:', data);
        this.vehicles = data;

        // Lade Bilder für jedes Fahrzeug
        this.vehicles.forEach(vehicle => {
          this.http.get<any[]>(`http://localhost:3000/api/vehicles/images/${vehicle.id}`)
            .subscribe({
              next: (images) => {
                vehicle.pictures = images; // Setzt das Bild-Array für das Fahrzeug
              },
              error: (error) => {
                console.error(`Fehler beim Abrufen der Bilder für Fahrzeug ${vehicle.id}:`, error);
                vehicle.pictures = []; // Falls kein Bild gefunden wurde, leer setzen
              }
            });
        });

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
    this.selectedCategory = ''; // Reset der Auswahl
    this.selectedMarkId = '';
    this.newVehicle.modelId = '';
    this.newVehicle.typeId = '';
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  loadCategories(): void {
    this.http.get<any[]>('http://localhost:3000/api/categories').subscribe({
      next: (data) => {
        this.categories = data;
        console.log('Geladene Kategorien:', this.categories);
      },
      error: (error) => {
        console.error('Fehler beim Laden der Kategorien:', error);
      }
    });
  }

  loadMarks(): void {
    if (!this.selectedCategory) return; // Falls keine Kategorie ausgewählt ist, nichts laden

    this.http.get<any[]>(`http://localhost:3000/api/marks/${this.selectedCategory}`).subscribe({
      next: (data) => {
        this.marks = data;
        this.selectedMarkId = '';
        this.models = []; // Zurücksetzen der Modelle
      },
      error: (error) => {
        console.error('Fehler beim Laden der Marken:', error);
      }
    });
  }

  loadModels(): void {
    if (!this.selectedMarkId) return;

    this.http.get<any[]>(`http://localhost:3000/api/models/${this.selectedMarkId}`).subscribe({
      next: (data) => {
        this.models = data;
        this.newVehicle.modelId = '';
      },
      error: (error) => {
        console.error('Fehler beim Laden der Modelle:', error);
      }
    });
  }

  loadTypes(): void {
    if (!this.selectedCategory) return;

    this.http.get<any[]>(`http://localhost:3000/api/types/${this.selectedCategory}`).subscribe({
      next: (data) => {
        this.types = data;
        this.newVehicle.typeId = '';
      },
      error: (error) => {
        console.error('Fehler beim Laden der Typen:', error);
      }
    });
  }

  addVehicle(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Kein Token gefunden!');
      return;
    }
    this.newVehicle.categoryId = this.selectedCategory;
    //this.newVehicle.userId = this.user.id;
    this.newVehicle.markId = this.selectedMarkId;

    const formData = new FormData();
    formData.append('name', this.newVehicle.name);
    formData.append('modelId', this.newVehicle.modelId);
    formData.append('typeId', this.newVehicle.typeId);
    formData.append('markId', this.newVehicle.markId);
    formData.append('categoryId', this.newVehicle.categoryId);
    formData.append('description', this.newVehicle.description);
    formData.append('price', this.newVehicle.price.toString());
    formData.append('dateOfFirstRegistration', this.newVehicle.dateOfFirstRegistration);
    formData.append('mileage', this.newVehicle.mileage.toString());
    formData.append('fuelType', this.newVehicle.fuelType);
    formData.append('color', this.newVehicle.color);
    formData.append('condition', this.newVehicle.condition);

    this.selectedImages.forEach((file, index) => {
      formData.append(`images`, file);
    });

    this.http.post('http://localhost:3000/api/vehicles', formData, {
      headers: new HttpHeaders({Authorization: `Bearer ${token}`})
    }).subscribe({
      next: (response) => {
        console.log('Fahrzeug erfolgreich hinzugefügt:', response);
        this.selectedImages = [];
        this.closeModal()
      },
      error: (error) => {
        console.error('Fehler beim Hinzufügen des Fahrzeugs:', error);
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedImages = Array.from(event.target.files);
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
          console.log('Fahrzeug erfolgreich aktualisiert.');
          this.fetchSellerListings(); // Fahrzeugliste neu laden
          this.closeEditModal(); // Modal schließen
        },
        error: (error) => {
          console.error('Fehler beim Aktualisieren des Fahrzeugs:', error);
        }
      });
  }

  deleteVehicle(vehicleId: number): void {
    const token = localStorage.getItem('token'); // 🔹 Token abrufen
    if (!token) {
      console.error('Kein Token gefunden im LocalStorage');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http.delete(`http://localhost:3000/api/vehicles/${vehicleId}`, { headers }).subscribe({
      next: () => {
        this.vehicles = this.vehicles.filter(v => v.id !== vehicleId);
        console.log('Fahrzeug erfolgreich gelöscht:', vehicleId);
      },
      error: (error) => {
        console.error('Fehler beim Löschen des Fahrzeugs:', error);
      }
    });
  }

}
