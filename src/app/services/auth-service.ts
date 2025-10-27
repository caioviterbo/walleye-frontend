import { Injectable } from '@angular/core';
import { Registro } from '../models/registro';
import { HttpClient } from '@angular/common/http';
import { environments } from '../environments/environments';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url = `${environments.apiUrl}`

  constructor(private readonly http: HttpClient) { }

  registrarUsuario(registro: Registro) {
    return this.http.post(this.url + '/auth/registro', registro)
  }

  logarUsuario(login: Login) {
    return this.http.post(this.url + '/auth/login', login)
  }

  testeGet() {
    return this.http.get(this.url + '/auth/me')
  }
}
