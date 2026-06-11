import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private http = inject(HttpClient);

  private readonly API_URL =
    'https://backend-makeup-6i49.onrender.com/api/v1/categories';

  getCategories() {
    return this.http.get<Category[]>(this.API_URL);
  }

  createCategory(data: Partial<Category>) {
    return this.http.post(this.API_URL, data);
  }

  updateCategory(
    id: string,
    data: Partial<Category>
  ) {
    return this.http.put(
      `${this.API_URL}/${id}`,
      data
    );
  }

  deleteCategory(id: string) {
    return this.http.delete(
      `${this.API_URL}/${id}`
    );
  }

}