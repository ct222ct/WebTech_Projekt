import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  imports: [NgIf, FormsModule, ],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  login(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Email and password are required';
      return;
    }

    this.userService.login(this.email, this.password).subscribe(
      (response) => {
        this.userService.saveToken(response.token);
        alert('Login successful!');
        this.router.navigate(['/dashboard']); // Weiterleitung zur Dashboard-Seite
      },
      (error) => {
        console.error('Fehler beim Login:', error);

        if (error.status === 400) {
          this.errorMessage = 'Email and password are required';
        } else if (error.status === 401) {
          this.errorMessage = 'Invalid email or password';
        } else if (error.status === 500) {
          this.errorMessage = 'Internal server error occurred during login';
        } else {
          this.errorMessage = 'An unknown error occurred during login';
        }
      }
    );
  }
}
