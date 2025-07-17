import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, computed, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl + 'auth';
  private _token = signal<string | null>(localStorage.getItem('token'));
  isLoggedIn = computed(() => !!localStorage.getItem('token'));

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials);
  }

  register(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, credentials);
  }  
  
  hasAnyRole(roles: string[]): boolean {
    const userRoles = this.getUserRoles(); // e.g., from JWT or user profile
    return roles.some(role => userRoles.includes(role));
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this._token.set(token);
  }

  logout() {
    localStorage.removeItem('token'); //
    this._token.set(null);
    window.location.href = '/login';
  }
    
  getUserRoles(): string[] {
    const token = localStorage.getItem('token');
    if (!token) return [];

    try {
      const decoded: any = jwtDecode(token);
      const roleClaim = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
      const claimValue = decoded[roleClaim];
      if (!claimValue) {
        return [];
      } 
      return Array.isArray(claimValue) ? claimValue : [claimValue];
    } catch {
      return [];
    }
  }
}