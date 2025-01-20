import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users'; // Backend-Endpoint

  constructor(private http: HttpClient) {}

  register(user: { email: string; password: string; address: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  getUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`);
  }

  updateUser(user: { email?: string; address?: string; password?: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile`, user);
  }
}
