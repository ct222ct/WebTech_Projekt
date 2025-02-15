import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users'; // Backend-Endpoint

  constructor(private http: HttpClient) {}

  register(user: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Abrufen der Benutzerdaten
  getUserData(): Observable<any> {
    const token = localStorage.getItem('token'); // Hol das gespeicherte JWT-Token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${this.apiUrl}/me`, { headers });
  }
  /*
  // Aktualisieren der Benutzerdaten
  updateUserData(updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, updatedData);
  }
   */

  updateUserData(updatedData: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.put('http://localhost:3000/api/users/update', updatedData, { headers });
  }

  deleteUserAccount(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.delete(`${this.apiUrl}/user`, { headers });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

}
