/*
import { HttpClient } from '@angular/common/http';

import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {LocalStorageService} from './local-storage.service';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
 providedIn: 'root',
})
export class AuthService {
 private apiUrl = 'http://localhost:3000/api/auth';

// private loggedIn: boolean = false;
 loginStatusChanged = new Subject<boolean>();

 constructor( @Inject(PLATFORM_ID) private platformId: Object) {
   if (isPlatformBrowser(this.platformId)) {
     const hasToken = !!localStorage.getItem('token');
     this.loggedInSubject.next(hasToken);
   }
 }

 /*
   // Schert das Token und ändert den Login-Status
   saveLogin(token: string): void {
     this.localStorageService.setItem('token', token);
     this.loggedIn = true;
     this.loginStatusChanged.next(true);
   }
constructor(private http: HttpClient,private localStorageService: LocalStorageService) {
this.loggedIn = !!this.localStorageService.getItem('token');
}
register(email: string, password: string, name: string, address: string) {
   return this.post(`${this.apiUrl}/register`, {email, password, name, address});
 }

 private hasToken(): boolean {
   return !!localStorage.getItem('token');

private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken()); // Initialer Status
 isLoggedIn$ = this.loggedInSubject.asObservable(); // Observable für Login-Status
 }
  */


import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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
}
