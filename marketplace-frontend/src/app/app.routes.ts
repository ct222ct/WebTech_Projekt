import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home/home.component';
import {CategoriesComponent} from './categories/categories.component';
import {CategoryDetailsComponent} from './category-details/category-details.component';
import {CarsComponent} from './vehicles/cars/cars.component';
import {MotorbikesComponent} from './vehicles/motorbikes/motorbikes.component';
import {VehicleListComponent} from './vehicle-list/vehicle-list.component';
import {SellerComponent} from './seller/seller.component';
import {SellerListingsComponent} from './seller-listings/seller-listings.component';

export const routes: Routes = [
  // Startseite (geschützt)
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'home',
    component: HomeComponent,
  },

  // Login-Seite
  {
    path: 'login',
    component: LoginComponent
  },

  // Registrierung
  {
    path: 'register',
    component: RegisterComponent
  },
  //{ path: '', redirectTo: '/categories', pathMatch: 'full' },
  //Categories
  { path: 'categories', component: CategoriesComponent },

  //Category Details
  { path: 'categories/:id', component: CategoryDetailsComponent },

  { path: 'vehicles/cars', component: CarsComponent },

  { path: 'vehicles/motorbikes', component: MotorbikesComponent },

  { path: 'vehicles/:category', component: VehicleListComponent },

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
  { path: 'seller', component: SellerComponent },

  { path: 'seller/listings', component: SellerListingsComponent , canActivate: [AuthGuard]},

  // Standardroute für unbekannte Pfade
  { path: '**', redirectTo: '', pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
