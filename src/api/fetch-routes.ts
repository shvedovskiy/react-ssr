import { fetchAppData } from 'src/features/data/actions';
import { RouteConfig } from './types';

export const fetchRoutes: RouteConfig[] = [
  {
    path: '/',
    exact: false,
    // fetch: fetchGlobalAppData,
    routes: [
      {
        path: '/data',
        fetch: fetchAppData,
      },
    ],
  },
];
