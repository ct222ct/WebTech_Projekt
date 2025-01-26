import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../services/user.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  imports: [NgIf, FormsModule,],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;
  returnUrl: string = '/'; // Standardwert, wenn keine Rücksprung-URL vorhanden ist

  constructor(
    private userService: UserService,
    private authService: AuthService, // AuthService hinzufügen
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Extrahiere die gespeicherte Rücksprung-URL
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Email and password are required';
      return;
    }

    this.userService.login(this.email, this.password).subscribe(
      (response) => {
        this.userService.saveToken(response.token);
        this.authService.saveLogin(response.token);
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
