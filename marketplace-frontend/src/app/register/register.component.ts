import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatInputModule, MatButtonModule],
  template: `
    <mat-card>
      <h2>Registrieren</h2>
      <form (ngSubmit)="register()">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Email</mat-label>
          <input matInput [(ngModel)]="user.email" name="email" required />
        </mat-form-field>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Passwort</mat-label>
          <input matInput [(ngModel)]="user.password" name="password" type="password" required />
        </mat-form-field>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Adresse</mat-label>
          <input matInput [(ngModel)]="user.address" name="address" />
        </mat-form-field>
        <button mat-raised-button color="primary" type="submit">Registrieren</button>
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
export class RegisterComponent {
  user = { email: '', password: '', address: '' };

  register() {
    console.log('Registrierung erfolgreich:', this.user);
  }
}
