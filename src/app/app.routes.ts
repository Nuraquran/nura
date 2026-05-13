import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'surah-list',
    loadComponent: () => import('./pages/surah-list/surah-list.page').then( m => m.SurahListPage)
  },
];
