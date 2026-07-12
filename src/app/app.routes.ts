// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./pages/sign-in/sign-in.page').then((m) => m.SignInPage),
  },
  // {
  //   path: 'register',
  //   loadComponent: () =>
  //     import('./pages/register/register.page').then((m) => m.RegisterPage),
  // },
  // {
  //   path: 'forgot-password',
  //   loadComponent: () =>
  //     import('./pages/forgot-password/forgot-password.page').then(
  //       (m) => m.ForgotPasswordPage,
  //     ),
  // },
  // ── Protected routes (kena login dulu) ──────────────────────────────────
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'surah-list',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/surah-list/surah-list.page').then((m) => m.SurahListPage),
  },
  {
    path: 'reader/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/reader/reader.page').then((m) => m.ReaderPage),
  },
];
