import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./users/users.routes').then((m) => m.userRoutes),
  },
  {
    path: 'files',
    loadChildren: () =>
      import('./files/files.routes').then((m) => m.filesRoutes),
  },
];
