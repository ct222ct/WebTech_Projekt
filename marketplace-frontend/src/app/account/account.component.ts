import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatInputModule, MatButtonModule],
  template: `
    <mat-card>
      <h2>Benutzerkonto verwalten</h2>
      <form (ngSubmit)="updateAccount()">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Neue Adresse</mat-label>
          <input matInput [(ngModel)]="user.newAddress" name="newAddress" />
        </mat-form-field>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Neues Passwort</mat-label>
          <input matInput [(ngModel)]="user.newPassword" name="newPassword" type="password" />
        </mat-form-field>
        <button mat-raised-button color="primary" type="submit">Aktualisieren</button>
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
export class AccountComponent {
  user = { newPassword: '', newAddress: '' };

  constructor(private http: HttpClient) {}

  updateAccount() {
    this.http.post('http://localhost:3000/api/update', this.user).subscribe(
      response => console.log('Benutzerinformationen aktualisiert', response),
      error => console.error('Fehler beim Aktualisieren', error)
    );
  }
}
