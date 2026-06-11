import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory } from '../models/inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private http = inject(HttpClient);
  private readonly API_URL = 'https://backend-makeup-6i49.onrender.com/api/v1/inventories';

  getInventories(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.API_URL);
  }

  createInventory(data: Partial<Inventory>): Observable<Inventory> {
    return this.http.post<Inventory>(this.API_URL, data);
  }

  updateInventory(id: string, data: Partial<Inventory>): Observable<Inventory> {
    return this.http.put<Inventory>(`${this.API_URL}/${id}`, data);
  }

  deleteInventory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}