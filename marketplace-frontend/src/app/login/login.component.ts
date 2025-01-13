import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatInputModule, MatButtonModule],
  template: `
    <mat-card>
      <h2>Login</h2>
      <form (ngSubmit)="login()">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Email</mat-label>
          <input matInput [(ngModel)]="credentials.email" name="email" required />
        </mat-form-field>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Passwort</mat-label>
          <input matInput [(ngModel)]="credentials.password" name="password" type="password" required />
        </mat-form-field>
        <button mat-raised-button color="primary" type="submit">Anmelden</button>
      </form>
    </mat-card>
  `,
  styles: [
    `
      mat-card {
        max-width: 400px;
        margin: 20px auto;
        padding: 20px;
      }
      .full-width {
        width: 100%;
      }
    `,
  ],
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  login() {
    console.log('Login erfolgreich:', this.credentials);
  }
}
