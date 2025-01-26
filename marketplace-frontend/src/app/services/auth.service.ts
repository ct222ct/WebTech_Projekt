import { HttpClient } from '@angular/common/http';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Subject} from 'rxjs';
import {isPlatformBrowser} from '@angular/common';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  private loggedIn: boolean = false;
  loginStatusChanged = new Subject<boolean>();


  // Speichert das Token und ändert den Login-Status
  saveLogin(token: string): void {
    this.localStorageService.setItem('token', token);
    this.loggedIn = true;
    this.loginStatusChanged.next(true);
  }


  constructor(private http: HttpClient,private localStorageService: LocalStorageService) {
    this.loggedIn = !!this.localStorageService.getItem('token');
  }

  register(email: string, password: string, name: string) {
    return this.http.post(`${this.apiUrl}/register`, { email, password, name });
  }

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
  logout(): void {
    this.localStorageService.removeItem('token');
    this.loggedIn = false;
    this.loginStatusChanged.next(false);
  }
}
