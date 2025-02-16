// Importiert die benötigten Angular-Module und Services
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Ermöglicht Zwei-Wege-Datenbindung

// Deklariert die Metadaten für die Verkäufer-Fahrzeuglisten-Komponente
@Component({
  selector: 'app-seller-listings', // Definiert den CSS-Selektor für die Komponente
  templateUrl: './seller-listings.component.html', // Verweist auf die HTML-Template-Datei der Komponente
  styleUrls: ['./seller-listings.component.less'], // Verweist auf die zugehörige Stylesheet-Datei
  imports: [
    NgIf, // Ermöglicht die Nutzung von *ngIf in der HTML-Datei
    NgForOf, // Ermöglicht die Nutzung von *ngFor für Listen
    FormsModule // Ermöglicht Formulareingaben und Zwei-Wege-Datenbindung
  ]
})
export class SellerListingsComponent implements OnInit {
  isLoading: boolean = true; // Steuert den Ladezustand der Daten
  user: any = null; // Speichert die Benutzerinformationen
  vehicles: any[] = []; // Liste der Fahrzeuge des Verkäufers
  isModalOpen: boolean = false; // Steuert die Sichtbarkeit des Modals für Fahrzeugerstellung
  models: any[] = []; // Speichert Modell-Daten aus der DB
  types: any[] = []; // Speichert Fahrzeugtypen aus der DB
  marks: any[] = []; // Speichert Fahrzeugmarken aus der DB
  categories: any[] = []; // Speichert Fahrzeugkategorien aus der DB

  selectedCategory: string = ''; // Ausgewählte Kategorie
  selectedMarkId: string = ''; // Ausgewählte Marke

  // Neues Fahrzeugobjekt für die Erstellung
  newVehicle: any = {
    categoryId: '',
    userId: '',
    markId: '',
    name: '',
    modelId: '',
    typeId: '',
    description: '',
    price: 0,
    dateOfFirstRegistration: '',
    mileage: 0,
    fuelType: '',
    color: '',
    condition: '',
    images: []
  };
  selectedImages: File[] = []; // Speichert ausgewählte Bilder

  editedVehicle: any = {}; // Speichert das aktuell zu bearbeitende Fahrzeug
  isEditModalOpen: boolean = false; // Steuert die Sichtbarkeit des Bearbeitungsmodals

  constructor(private http: HttpClient, private userService: UserService) {}

  // Wird beim Initialisieren der Komponente aufgerufen
  ngOnInit(): void {
    this.loadUserAndListings();
    this.loadCategories();
  }

  // Lädt Benutzerdaten und die Fahrzeuglisten
  loadUserAndListings(): void {
    this.userService.getUserData().subscribe({
      next: (user) => {
        this.user = user;
        this.fetchSellerListings();
      },
      error: (err) => {
        console.error('Fehler beim Abrufen der Benutzerdaten:', err);
        this.isLoading = false;
      }
    });
  }

  // Lädt die Fahrzeugliste des Verkäufers
  fetchSellerListings(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.get<any[]>('http://localhost:3000/api/vehicles/seller/listings', { headers }).subscribe({
      next: (data) => {
        this.vehicles = data;

        // Lade Bilder für jedes Fahrzeug
        this.vehicles.forEach(vehicle => {
          this.http.get<any[]>(`http://localhost:3000/api/vehicles/images/${vehicle.id}`)
            .subscribe({
              next: (images) => {
                vehicle.pictures = images;
              },
              error: () => {
                vehicle.pictures = []; // Falls kein Bild vorhanden, leeres Array setzen
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

  // Markiert ein Fahrzeug als verkauft
  markAsSold(vehicleId: number): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.put(`http://localhost:3000/api/vehicles/mark-sold/${vehicleId}`, {}, { headers })
      .subscribe({
        next: () => this.loadUserAndListings(),
        error: (err) => console.error('Fehler beim Markieren als verkauft:', err),
      });
  }

  // Öffnet das Modal für das Hinzufügen eines Fahrzeugs
  openModal(): void {
    this.isModalOpen = true;
    this.selectedCategory = '';
    this.selectedMarkId = '';
  }

  // Schließt das Modal für das Hinzufügen eines Fahrzeugs
  closeModal(): void {
    this.isModalOpen = false;
  }

  // Lädt die Fahrzeugkategorien
  loadCategories(): void {
    this.http.get<any[]>('http://localhost:3000/api/categories').subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Fehler beim Laden der Kategorien:', error);
      }
    });
  }

  // Lädt Marken basierend auf der gewählten Kategorie
  loadMarks(): void {
    if (!this.selectedCategory) return;

    this.http.get<any[]>(`http://localhost:3000/api/marks/${this.selectedCategory}`).subscribe({
      next: (data) => {
        this.marks = data;
      },
      error: (error) => {
        console.error('Fehler beim Laden der Marken:', error);
      }
    });
  }

  // Lädt Modelle basierend auf der gewählten Marke
  loadModels(): void {
    if (!this.selectedMarkId) return;

    this.http.get<any[]>(`http://localhost:3000/api/models/${this.selectedMarkId}`).subscribe({
      next: (data) => {
        this.models = data;
      },
      error: (error) => {
        console.error('Fehler beim Laden der Modelle:', error);
      }
    });
  }

  // Lädt Fahrzeugtypen basierend auf der gewählten Kategorie
  loadTypes(): void {
    if (!this.selectedCategory) return;

    this.http.get<any[]>(`http://localhost:3000/api/types/${this.selectedCategory}`).subscribe({
      next: (data) => {
        this.types = data;
      },
      error: (error) => {
        console.error('Fehler beim Laden der Typen:', error);
      }
    });
  }

  // Fügt ein neues Fahrzeug hinzu
  addVehicle(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Kein Token gefunden!');
      return;
    }
    this.newVehicle.categoryId = this.selectedCategory;
    this.newVehicle.markId = this.selectedMarkId;

    const formData = new FormData();
    Object.keys(this.newVehicle).forEach(key => {
      formData.append(key, this.newVehicle[key]);
    });

    this.selectedImages.forEach(file => {
      formData.append('images', file);
    });

    this.http.post('http://localhost:3000/api/vehicles', formData, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    }).subscribe({
      next: () => {
        this.selectedImages = [];
        this.closeModal();
      },
      error: (error) => {
        console.error('Fehler beim Hinzufügen des Fahrzeugs:', error);
      }
    });
  }

  // Wählt Bilder für den Upload aus
  onFileSelected(event: any): void {
    this.selectedImages = Array.from(event.target.files);
  }

  // Öffnet das Bearbeitungsmodal für ein Fahrzeug
  openEditModal(vehicle: any): void {
    this.editedVehicle = { ...vehicle };
    this.isEditModalOpen = true;
  }

  // Schließt das Bearbeitungsmodal
  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  // Aktualisiert ein Fahrzeug
  updateVehicle(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.put(`http://localhost:3000/api/vehicles/${this.editedVehicle.id}`, this.editedVehicle, { headers })
      .subscribe(() => {
        this.fetchSellerListings();
        this.closeEditModal();
      });
  }

  // Löscht ein Fahrzeug
  deleteVehicle(vehicleId: number): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.delete(`http://localhost:3000/api/vehicles/delete/${vehicleId}`, { headers }).subscribe(() => {
      this.vehicles = this.vehicles.filter(v => v.id !== vehicleId);
    });
  }
}
