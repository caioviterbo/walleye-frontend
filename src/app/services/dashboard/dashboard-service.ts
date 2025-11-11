import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { DashboardResponse } from '../../models/dashboard-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly API = environments.apiUrl;

  constructor(private http: HttpClient) {}

   getDashboard(): Observable<DashboardResponse> {
    return this.http.get<DashboardResponse>(`${this.API}/dashboard`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }
}
