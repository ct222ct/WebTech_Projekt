import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: any = null;
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const hasToken = !!localStorage.getItem('token');
      this.loggedInSubject.next(hasToken);
    }
  }

  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  login(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
      this.loggedInSubject.next(true);
    }
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      this.loggedInSubject.next(false);
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }
  getUserId(): number | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.id;
      } catch (error) {
        console.error('Fehler beim Dekodieren des Tokens:', error);
        return null;
      }
    }
    return null;
  }
  getUserEmail(): number | null {
    const token = this.getToken();
    console.log('🔍 Token:', token);
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.email;
      } catch (error) {
        console.error('Fehler beim Dekodieren des Tokens:', error);
        return null;
      }
    }
    return null;
  }


}
