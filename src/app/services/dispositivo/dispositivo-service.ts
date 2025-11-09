import { Dispositivo } from './../../models/dispositivo';
import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {
  private readonly API = environments.apiUrl;

  constructor(private http: HttpClient) {}

  adicionarDispositivo(dispositivo: Dispositivo) {
    return this.http.post(`${this.API}device/add`, dispositivo)
  }
}
