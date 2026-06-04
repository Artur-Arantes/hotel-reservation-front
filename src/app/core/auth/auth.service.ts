import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, RegisterRequest, TokenResponse } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly apiUrl = `${environment.apiUrl}/api/auth`;
  private readonly ACCESS_TOKEN_KEY = 'accessToken';
  private readonly REFRESH_TOKEN_KEY = 'refreshToken';

  constructor(private http: HttpClient, private router: Router) {}

  login(request: LoginRequest): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.apiUrl}/login`, request).pipe(
      tap(response => this.saveTokens(response))
    );
  }

  register(request: RegisterRequest): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.apiUrl}/register`, request).pipe(
      tap(response => this.saveTokens(response))
    );
  }

  refresh(): Observable<TokenResponse> {
    const refreshToken = this.getRefreshToken();
    return this.http.post<TokenResponse>(`${this.apiUrl}/refresh`, { refreshToken }).pipe(
      tap(response => this.saveTokens(response))
    );
  }

  logout(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  private saveTokens(response: TokenResponse): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, response.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refreshToken);
  }
}
