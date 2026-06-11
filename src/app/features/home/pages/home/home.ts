import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Session } from '../../../../shared/services/session';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  private session = inject(Session);
  private router = inject(Router);

  logout(): void {
    this.session.removeToken();
    this.router.navigate(['']);
  }

}