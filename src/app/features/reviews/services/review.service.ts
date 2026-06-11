import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  private http = inject(HttpClient);

  private readonly API_URL =
    'https://backend-makeup-6i49.onrender.com/api/v1/reviews';

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.API_URL);
  }

  createReview(data: Partial<Review>): Observable<Review> {
    return this.http.post<Review>(this.API_URL, data);
  }

  updateReview(
    id: string,
    data: Partial<Review>
  ): Observable<Review> {
    return this.http.put<Review>(
      `${this.API_URL}/${id}`,
      data
    );
  }

  deleteReview(id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.API_URL}/${id}`
    );
  }
}