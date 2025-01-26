import {Component, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {AuthService} from './services/auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule, NgIf],
  templateUrl: './app.component.html',
  styles: [
    `
      .spacer {
        flex: 1 1 auto;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false; // Variable definiert und initialisiert

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Überprüfe den Login-Status beim Laden der App
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  title = 'marketplace-frontend'; // Titel der App definiert
}
