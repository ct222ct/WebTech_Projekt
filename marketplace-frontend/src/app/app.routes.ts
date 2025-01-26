import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { CommonModule } from '@angular/common';

export const routes: Routes = [
  // Startseite (geschützt)
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
    canActivate: [AuthGuard], // Schutz vor unautorisierten Zugriffen
  },

  // Login-Seite
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },

  // Registrierung
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then((m) => m.RegisterComponent),
  },

  // Fahrzeug-Marktplatz
  {
    path: 'vehicles',
    loadComponent: () =>
      import('./vehicle-marketplace/vehicle-marketplace.component').then(
        (m) => m.VehicleMarketplaceComponent
      ),
  },

  // Fahrzeugdetails
  {
    path: 'vehicle/:id',
    loadComponent: () =>
      import('./vehicle-marketplace/vehicle-detail.component').then(
        (m) => m.VehicleDetailComponent
      ),
  },

  // Benutzerprofil
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile.component').then((m) => m.ProfileComponent),
    canActivate: [AuthGuard], // Nur für authentifizierte Benutzer zugänglich
  },
  // Dashboard-Seite
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
    canActivate: [AuthGuard], // Nur für authentifizierte Benutzer zugänglich
  },


  // Standardroute für unbekannte Pfade
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
