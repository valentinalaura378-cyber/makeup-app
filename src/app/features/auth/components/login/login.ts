import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginRequest, RegisterRequest } from '../../models/auth';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { Session } from '../../../../shared/services/session';

@Component({
  selector: 'login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  private _AuthService = inject(AuthService);
  private _sessionService = inject(Session);
  private router = inject(Router);

  user = '';
  password = '';

  public error = '';

  sendLogin() {

    this.error = '';

    const body: LoginRequest = {
      email: this.user,
      password: this.password
    };

    this._AuthService.login(body).subscribe({
      next: (res) => {

        this._sessionService.setToken(res.token);

        this.router.navigate(['/home']);

      },
      error: (err) => {

        console.log('ERROR LOGIN:', err);

        this.error =
          err.error?.message ||
          'Usuario no existe o contraseña incorrecta';

      }
    });
  }

  sendRegister() {

    this.error = '';

    const body: RegisterRequest = {
      name: this.user,
      email: this.user,
      password: this.password
    };

    this._AuthService.register(body).subscribe({
      next: (res) => {

        console.log('Usuario registrado', res);

        alert('Usuario registrado correctamente');

        this.user = '';
        this.password = '';

      },
      error: (err) => {

        console.log('ERROR REGISTER:', err);

        this.error =
          err.error?.message ||
          'Error al registrar usuario';

      }
    });
  }
}