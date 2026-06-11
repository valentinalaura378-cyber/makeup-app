import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, LoginResponse, RegisterRequest } from '../models/auth';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);
  private readonly API_URL = 'https://backend-makeup-6i49.onrender.com/api/v1';

  login(credentials: LoginRequest) {
    return this.http.post<LoginResponse>(
      `${this.API_URL}/auth/login`,
      credentials
    ).pipe(
      tap({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.error(err);
        },
      })
    );
  }

  register(user: RegisterRequest) {
    return this.http.post(
      `${this.API_URL}/auth/register`,
      user
    ).pipe(
      tap({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.error(err);
        },
      })
    );
  }
}