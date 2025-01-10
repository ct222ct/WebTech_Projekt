import { Component } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RegisterComponent, HttpClientModule],
  template: `
    <h1>Willkommen bei Marketplace</h1>
    <app-register></app-register>
  `,
})
export class AppComponent {}
