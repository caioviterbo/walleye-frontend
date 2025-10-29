import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { tap } from 'rxjs';
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
       `${this.API}/auth/login`, credenciais
    ).pipe(tap(res => localStorage.setItem(this.TOKEN_KEY, res.token)))
  }

  registrar(credenciais: Registro) {
    return this.http.post(`${this.API}/auth/signup`, credenciais)
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
