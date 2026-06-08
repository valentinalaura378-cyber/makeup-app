import { Component, inject } from '@angular/core';
import { Session } from '../../../shared/services/session';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  token: string | null = '';

  private _sessionService = inject(Session);

  recuperarToken() {
  this.token = this._sessionService.getToken();

  }

}
