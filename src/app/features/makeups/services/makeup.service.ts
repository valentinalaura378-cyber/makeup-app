import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Makeup } from '../models/makeup';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MakeupsService {
  private http = inject(HttpClient);
  private readonly API_URL = 'https://backend-makeup-6i49.onrender.com/api/v1/makeups';

  getMakeups(): Observable<Makeup[]> {
    return this.http.get<Makeup[]>(this.API_URL);
  }

  createMakeup(data: Partial<Makeup>): Observable<Makeup> {
    return this.http.post<Makeup>(this.API_URL, data);
  }

  updateMakeup(id: string, data: Partial<Makeup>): Observable<Makeup> {
    return this.http.put<Makeup>(`${this.API_URL}/${id}`, data);
  }

  deleteMakeup(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}