import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // HttpClientModule hier importieren
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user = { email: '', password: '', address: '' };

  constructor(private http: HttpClient) {}

  register() {
    console.log('Benutzer registriert:', this.user);
  }
  
}
