import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule, HttpClientModule],
  template: `
    <mat-toolbar color="primary">
      <span>Marketplace</span>
      <span class="spacer"></span>
      <a mat-button routerLink="/">Home</a>
      <a mat-button routerLink="/login">Login</a>
      <a mat-button routerLink="/register">Register</a>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      .spacer {
        flex: 1 1 auto;
      }
    `,
  ],
})
export class AppComponent {
  title: string = 'My App Title'; // Correct declaration of the 'title' property
}
