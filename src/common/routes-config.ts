import { Home } from 'src/features/home/home';
import { Data } from 'src/features/data/components/data';
import { NotFound } from 'src/common/components/not-found/not-found';

export const routes = [
  {
    key: 'home',
    path: '/',
    exact: true,
    component: Home,
  },
  {
    key: 'data',
    path: '/data',
    component: Data,
  },
  {
    key: 'not-found',
    component: NotFound,
  },
];
