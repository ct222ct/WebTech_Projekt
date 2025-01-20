import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { VehicleMarketplaceComponent } from './app/vehicle-marketplace/vehicle-marketplace.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    BrowserAnimationsModule, provideAnimationsAsync(),
    provideHttpClient(
      withFetch() // Aktiviert Fetch für bessere SSR-Leistung
    ),
  ],
}).catch(err => console.error(err));
