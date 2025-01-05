import { Routes } from '@angular/router';
import { databaseInitGuard } from './guards/database-init.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate: [databaseInitGuard],
  },
  {
    path: 'manage-quotes',
    loadComponent: () => import('./pages/manage-quotes/manage-quotes.page').then((m) => m.ManageQuotesPage),
    canActivate: [databaseInitGuard],
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page').then((m) => m.SettingsPage),
    canActivate: [databaseInitGuard],
  },
];

