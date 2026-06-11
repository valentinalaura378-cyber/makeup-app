import { Routes } from '@angular/router';

import { Login } from './features/auth/components/login/login';
import { Home } from './features/home/pages/home/home';

import { Brands } from './features/brands/pages/brands';
import { Categories } from './features/categories/pages/categories';
import { InventoryComponent } from './features/inventory/pages/inventory';
import { Makeups } from './features/makeups/pages/makeups';
import { Reviews } from './features/reviews/pages/reviews';

export const routes: Routes = [

  {
    path: '',
    component: Login
  },

  {
    path: 'home',
    component: Home
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
    component: InventoryComponent
  },

  {
    path: 'makeups',
    component: Makeups
  },

  {
    path: 'reviews',
    component: Reviews
  },

  {
    path: '**',
    redirectTo: ''
  }

];