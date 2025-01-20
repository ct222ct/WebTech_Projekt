
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component'
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import {VehicleMarketplaceComponent} from './vehicle-marketplace/vehicle-marketplace.component';
import {AuthGuard} from './auth/auth.guard';
import {VehicleDetailComponent} from './vehicle-marketplace/vehicle-detail.component';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile/profile.component'; // Neue Komponente für Benutzerverwaltung

export const routes: Routes = [
  { path: '', component: HomeComponent}, // HomeScreen als Standardroute
  { path: 'login', component: LoginComponent },
  //{ path: '**', redirectTo: '', pathMatch: 'full' }, // Alle unbekannten Routen umleiten
  { path: 'register', component: RegisterComponent },
  { path: 'account', component: AccountComponent }, // Benutzerverwaltung
  { path: 'vehicle/:id', component: VehicleDetailComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },

  {path: 'vehicles',
    loadComponent: () =>
      import('./vehicle-marketplace/vehicle-marketplace.component').then((m) => m.VehicleMarketplaceComponent),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}

