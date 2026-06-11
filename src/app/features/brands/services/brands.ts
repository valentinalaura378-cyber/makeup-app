import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Brand } from '../models/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  private http = inject(HttpClient);

  private readonly API_URL =
    'https://backend-makeup-6i49.onrender.com/api/v1/brands';

  getBrands() {
    return this.http.get<Brand[]>(
      this.API_URL
    );
  }

  getBrand(id: string) {
    return this.http.get<Brand>(
      `${this.API_URL}/${id}`
    );
  }

  createBrand(data: Partial<Brand>) {
    return this.http.post<Brand>(
      this.API_URL,
      data
    );
  }

  updateBrand(
    id: string,
    data: Partial<Brand>
  ) {
    return this.http.put<Brand>(
      `${this.API_URL}/${id}`,
      data
    );
  }

  deleteBrand(id: string) {
    return this.http.delete(
      `${this.API_URL}/${id}`
    );
  }

}