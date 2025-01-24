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
    // Überprüfen, ob alle Felder ausgefüllt sind
    if (!this.user.email || !this.user.password || !this.user.address) {
      this.errorMessage = 'All fields are required';
      return;
    }

    this.userService.register(this.user).subscribe(
      () => {
        alert('Registration successful!');
        this.router.navigate(['/login']); // Weiterleitung zur Login-Seite
      },
      (error) => {
        if (error.status === 400) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'An error occurred during registration.';
        }
      }
    );
  }



}
