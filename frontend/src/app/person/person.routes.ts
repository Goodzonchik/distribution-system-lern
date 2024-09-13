import { Routes } from '@angular/router';
import { PersonTableComponent } from './person-table/person-table.component';

export const personRoutes: Routes = [
  {
    path: '',
    component: PersonTableComponent,
  },
];
