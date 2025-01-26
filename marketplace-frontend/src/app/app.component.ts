import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  imports: [
    RouterOutlet,
    RouterLink,
    NgIf,
  ]
})
export class AppComponent {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Überprüfe den Login-Status beim Laden der Anwendung
    this.isLoggedIn = this.authService.isLoggedIn();

    // Beobachte Änderungen des Login-Status
    this.authService.loginStatusChanged.subscribe((status: boolean) => {
      this.isLoggedIn = status;
    });
  }

  logout(): void {
    this.authService.logout(); // Benutzer ausloggen
    this.router.navigate(['/']); // Weiterleitung zur Startseite
  }

  title = 'Marketplace'; // Füge die Eigenschaft hinzu

}
