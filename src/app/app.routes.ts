import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'quran/:surahNumber',
    loadComponent: () =>
      import('./features/quran-reader/reader.page').then(
        (component) => component.ReaderPage,
      ),
  },
  {
    path: 'bookmarks',
    loadComponent: () =>
      import('./features/bookmarks/bookmark.page').then(
        (component) => component.BookmarkPage,
      ),
  },
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
          import('./features/home/home.page').then(
            (component) => component.HomePage,
          ),
      },
      {
        path: 'quran',
        loadComponent: () =>
          import('./features/surah-list/surah-list.page').then(
            (component) => component.SurahListPage,
          ),
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
        pathMatch: 'full',
        redirectTo: '/bookmarks',
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
