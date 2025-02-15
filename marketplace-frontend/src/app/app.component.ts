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
  username: string = 'Benutzer';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
