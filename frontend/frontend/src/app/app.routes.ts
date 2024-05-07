import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./home/home.page').then((c) => c.HomePage),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./detail-view/detail-view.component').then(
        (c) => c.DetailViewComponent
      ),
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];
