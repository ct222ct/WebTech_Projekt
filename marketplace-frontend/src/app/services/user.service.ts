import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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


  getUserData(): Observable<{ name: string; email: string; address: string }> {
    return this.http.get<{ name: string; email: string; address: string }>(this.apiUrl);
  }

  updateUserData(user: any): Observable<any> {
    return this.http.put('/api/user', user);
  }

  deleteAccount(): Observable<any> {
    return this.http.delete('/api/user');
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
