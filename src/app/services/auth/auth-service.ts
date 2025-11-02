import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { Login } from '../../models/login';
import { Registro } from '../../models/registro';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'token'
  private readonly API = environments.apiUrl;

  constructor(private http: HttpClient) {}

  logar(credenciais: Login) {
    return this.http.post<{token: string, expiresIn: number}>(
       `${this.API}/auth/login`, credenciais)
  }

  registrar(credenciais: Registro) {
    return this.http.post(`${this.API}/auth/registro`, credenciais)
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string | null): boolean {
  try {
    const payload = token?.split('.')[1] ? JSON.parse(atob(token.split('.')[1])) : null;
    return Date.now() > payload.exp * 1000;
  } catch {
    return true;
  }
}

getToken(): string | null {
  const token = localStorage.getItem(this.TOKEN_KEY);
  if (!token || this.isTokenExpired(token)) {
    localStorage.removeItem(this.TOKEN_KEY);
    return null;
  }
  return token;
}

}
