// Importiert die benötigten Angular-Module für Routing und CommonModule
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

// Importiert Komponenten für verschiedene Routen
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { CarsComponent } from './vehicles/cars/cars.component';
import { MotorbikesComponent } from './vehicles/motorbikes/motorbikes.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { SellerComponent } from './seller/seller.component';
import { SellerListingsComponent } from './seller-listings/seller-listings.component';
import { VehicleDetailsComponent } from './vehicles/vehicle-details/vehicle-details.component';

// Definiert die Routen für die Anwendung
export const routes: Routes = [
  /**
   * Startseite
   */
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },

  /**
   * Authentifizierung (Login & Registrierung)
   */
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },

  /**
   * Kategorien & Kategorie-Details
   */
  { path: 'categories', component: CategoriesComponent },
  { path: 'categories/:id', component: CategoryDetailsComponent },

  /**
   * Fahrzeug-Routen
   */
  { path: 'vehicles/cars', component: CarsComponent },
  { path: 'vehicles/motorbikes', component: MotorbikesComponent },
  { path: 'vehicles/:category', component: VehicleListComponent },

  /**
   * Benutzerprofil (nur für authentifizierte Benutzer)
   */
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile.component').then((m) => m.ProfileComponent),
    canActivate: [AuthGuard], // Nur für authentifizierte Benutzer zugänglich
  },

  /**
   * Dashboard (nur für authentifizierte Benutzer)
   */
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
    canActivate: [AuthGuard], // Nur für authentifizierte Benutzer zugänglich
  },

  /**
   * Verkäuferbereich (Erstellung & Verwaltung)
   */
  { path: 'seller', component: SellerComponent },
  {
    path: 'seller/listings',
    component: SellerListingsComponent,
    canActivate: [AuthGuard], // Nur für eingeloggte Benutzer
  },

  /**
   * Fahrzeugdetails
   */
  { path: 'vehicle-details/:id', component: VehicleDetailsComponent },

  /**
   * Fehlerhafte Routen umleiten
   * - Falls eine unbekannte Route aufgerufen wird, wird auf die Startseite weitergeleitet
   */
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

// Deklariert das Routing-Modul der Anwendung
@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule], // Definiert die Routen für die gesamte App
  exports: [RouterModule], // Exportiert das RouterModule zur Nutzung in anderen Modulen
})
export class AppRoutingModule {}
