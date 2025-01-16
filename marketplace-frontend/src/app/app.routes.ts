import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import {VehicleMarketplaceComponent} from './vehicle-marketplace/vehicle-marketplace.component'; // Neue Komponente für Benutzerverwaltung

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account', component: AccountComponent }, // Benutzerverwaltung
  {path: 'vehicles',
    loadComponent: () =>
      import('./vehicle-marketplace/vehicle-marketplace.component').then((m) => m.VehicleMarketplaceComponent),
  },

];
