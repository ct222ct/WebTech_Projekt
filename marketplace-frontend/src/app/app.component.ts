import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import {Router, RouterOutlet} from '@angular/router';
import {NgIf} from '@angular/common';
import {MatToolbar} from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  imports: [
    NgIf,
    MatToolbar,
    RouterOutlet
  ]
})
export class AppComponent {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.authService.loginStatusChanged.subscribe((status: boolean) => {
      this.isLoggedIn = status;
    });
  }

  logout(): void {
    this.authService.logout(); // Setze den Login-Status zurück
    this.router.navigate(['/login']); // Weiterleitung zur Login-Seite
  }

  title = 'Marketplace'; // Füge die Eigenschaft hinzu

}
