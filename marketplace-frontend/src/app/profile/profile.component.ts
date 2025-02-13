import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [
    NgIf,
    FormsModule
  ],
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
  user = {
    name: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: ''
  };
  errorMessage: string | null = null;
  isEditMode: boolean = false; // Bearbeitungsmodus steuern

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.userService.getUserData().subscribe(
      (data) => {
        this.user.name = data.name;
        this.user.email = data.email;
        this.user.address = data.address;
      },
      (error) => {
        console.error('Fehler beim Laden der Benutzerdaten:', error);
        this.errorMessage = 'Die Benutzerdaten konnten nicht geladen werden.';
      }
    );
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode; // Bearbeitungsmodus umschalten
    if (!this.isEditMode) {
      // Wenn der Bearbeitungsmodus deaktiviert wird, lade die Originaldaten erneut
      this.loadUserData();
    }
  }

  saveProfile(): void {
    if (this.user.password && this.user.password !== this.user.confirmPassword) {
      this.errorMessage = 'Die Passwörter stimmen nicht überein.';
      return;
    }

    const updatedData = {
      name: this.user.name,
      email: this.user.email,
      address: this.user.address,
      password: this.user.password
    };

    this.userService.updateUserData(updatedData).subscribe(
      () => {
        alert('Profil erfolgreich aktualisiert');
        this.errorMessage = null;
        this.isEditMode = false; // Bearbeitungsmodus deaktivieren
      },
      (error) => {
        console.error('Fehler beim Speichern der Benutzerdaten:', error);
        this.errorMessage = 'Das Profil konnte nicht aktualisiert werden.';
      }
    );
  }
}
