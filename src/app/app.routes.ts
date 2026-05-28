import { Routes } from '@angular/router';

import { Home } from './features/components/home/home';
import { Makeups } from './features/components/makeups/makeups';
import { Brands } from './features/components/brands/brands';
import { Categories } from './features/components/categories/categories';
import { Inventory } from './features/components/inventory/inventory';
import { Reviews } from './features/components/reviews/reviews';
import { Dashboard } from './features/components/dashboard/dashboard';
import { Login } from './features/auth/components/login/login';

export const routes: Routes = [

  {
    path: '',
    component: Home
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'makeups',
    component: Makeups
  },

  {
    path: 'brands',
    component: Brands
  },

  {
    path: 'categories',
    component: Categories
  },

  {
    path: 'inventory',
    component: Inventory
  },

  {
    path: 'reviews',
    component: Reviews
  },

  {
    path: 'dashboard',
    component: Dashboard
  }

];