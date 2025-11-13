import { Dispositivo } from './../../models/dispositivo';
import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { UUID } from 'crypto';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {
  private readonly API = environments.apiUrl;

  constructor(private http: HttpClient) {}

  adicionarDispositivo(dispositivo: Dispositivo) {
    return this.http.post(`${this.API}/device/add`, dispositivo)
  }

  editarDispositivo(id: UUID, dispositivo: Dispositivo) {
    return this.http.post(`${this.API}/device/edit/${id}`, dispositivo)
  }

  removerDispositivo(id: UUID) {
    return this.http.delete(`${this.API}/device/delete/${id}`)
  }
}
