import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, computed, signal } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://localhost:7097/api/auth';
  private _token = signal<string | null>(localStorage.getItem('token'));
  isLoggedIn = computed(() => !!localStorage.getItem('token'));

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials);
  }

  register(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, credentials);
  }  
  

  setToken(token: string) {
    localStorage.setItem('token', token);
    this._token.set(token);
  }

  logout() {
    localStorage.removeItem('token');
    this._token.set(null);
    window.location.href = '/login';
  }
}
