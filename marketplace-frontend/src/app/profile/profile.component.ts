import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Für [(ngModel)]
    MatCardModule, // Für <mat-card>
    MatFormFieldModule, // Für <mat-form-field>
    MatInputModule, // Für matInput
    MatButtonModule, // Für mat-raised-button
  ],
  template: `
    <mat-card>
      <h2>Benutzerprofil</h2>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Adresse:</strong> {{ user.address }}</p>
      <form (ngSubmit)="updateProfile()">
        <mat-form-field class="full-width">
          <mat-label>Neue Adresse</mat-label>
          <input matInput [(ngModel)]="newAddress" name="newAddress" />
        </mat-form-field>
        <mat-form-field class="full-width">
          <mat-label>Neues Passwort</mat-label>
          <input matInput [(ngModel)]="newPassword" name="newPassword" type="password" />
        </mat-form-field>
        <button mat-raised-button color="primary" type="submit">Aktualisieren</button>
      </form>
    </mat-card>
  `,
  styles: [
    `
      mat-card {
        max-width: 400px;
        margin: auto;
        padding: 20px;
      }
      .full-width {
        width: 100%;
      }
    `,
  ],
})
export class ProfileComponent {
  user = { email: '', address: '' };
  newPassword = '';
  newAddress = '';

  constructor() {}

  updateProfile() {
    console.log('Profil aktualisiert', this.newAddress, this.newPassword);
  }
}
