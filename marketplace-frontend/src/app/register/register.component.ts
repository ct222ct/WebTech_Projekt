import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
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
  name: string = '';
  email: string = '';
  password: string = '';
  address: string = '';
  errorMessage: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  register(): void {
    if (!this.name || !this.email || !this.password || !this.address) {
      this.errorMessage = 'Bitte füllen Sie alle Felder aus.';
      return;
    }

    const newUser = {
      name: this.name,
      email: this.email,
      password: this.password,
      address: this.address,
    };

    this.userService.register(newUser).subscribe(
      () => {
        alert('Registrierung erfolgreich!');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Fehler bei der Registrierung:', error);
        this.errorMessage = 'Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.';
      }
    );
  }
}
