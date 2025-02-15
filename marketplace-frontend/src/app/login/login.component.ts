import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  imports: [NgIf, FormsModule],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;
  returnUrl: string = '/';

  constructor(
    private userService: UserService,
    private authService: AuthService, // AuthService für Login-Status
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Bitte geben Sie E-Mail und Passwort ein.';
      return;
    }

    this.userService.login(this.email, this.password).subscribe(
      (response) => {
        this.authService.login(response.token); // Setze isLoggedIn auf true
        alert('Login erfolgreich!');

        const returnUrl = localStorage.getItem('returnUrl');

        if (returnUrl && !returnUrl.includes('/register')) {
          this.router.navigate([returnUrl]);
        } else {
          this.router.navigate(['/']);
        }
        localStorage.removeItem('returnUrl');
      },
      (error) => {
        console.error('Fehler beim Login:', error);
        this.errorMessage = this.getErrorMessage(error.status);
      }
    );
  }

  private getErrorMessage(status: number): string {
    switch (status) {
      case 400:
        return 'Ungültige Anmeldedaten. Bitte versuchen Sie es erneut.';
      case 401:
        return 'Invalid email or password';
      case 500:
        return 'Internal server error occurred during login';
      default:
        return 'An unknown error occurred during login';
    }
  }
}
