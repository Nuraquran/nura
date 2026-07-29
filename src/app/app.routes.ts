import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/app-shell/app-shell.component').then(
        (component) => component.AppShellComponent,
      ),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./features/placeholder/placeholder.page').then(
            (component) => component.PlaceholderPage,
          ),
        data: { label: 'Home' },
      },
      {
        path: 'quran',
        loadComponent: () =>
          import('./features/placeholder/placeholder.page').then(
            (component) => component.PlaceholderPage,
          ),
        data: { label: 'Quran' },
      },
      {
        path: 'listen',
        loadComponent: () =>
          import('./features/placeholder/placeholder.page').then(
            (component) => component.PlaceholderPage,
          ),
        data: { label: 'Listen' },
      },
      {
        path: 'saved',
        loadComponent: () =>
          import('./features/placeholder/placeholder.page').then(
            (component) => component.PlaceholderPage,
          ),
        data: { label: 'Saved' },
      },
      {
        path: 'more',
        loadComponent: () =>
          import('./features/placeholder/placeholder.page').then(
            (component) => component.PlaceholderPage,
          ),
        data: { label: 'More' },
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
