import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
  imports: [
    FormsModule,
    NgIf
  ]
})
export class RegisterComponent {
  user = {
    email: '',
    password: '',
    address: '',
  };
  errorMessage: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  register(): void {
    this.userService.register(this.user).subscribe(
      (response) => {
        console.log('Antwort vom Server:', response); // Erfolgreiche Antwort
        alert(response.message); // Zeige die Erfolgsnachricht an
      },
      (error) => {
        console.error('Fehler bei der Registrierung:', error);
        this.errorMessage = error.error?.message || 'Registrierung fehlgeschlagen.';
      }
    );
  }


}
