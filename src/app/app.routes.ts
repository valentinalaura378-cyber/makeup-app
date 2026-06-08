import { Routes } from '@angular/router';
import { Login } from './features/auth/components/login/login';
import { Brands } from './features/components/brands/brands';
import { Home } from './features/components/home/home';
export const routes: Routes = [

  {
    path: '',
    component: Login
  },

  {
    path: 'home',
    component: Home
  }

];