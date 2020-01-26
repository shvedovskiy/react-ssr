import { DynamicCounter } from 'src/components/dynamic-counter/dynamic-counter';
import { Data } from 'src/components/data/data';
import { StaticHelloWorld } from 'src/components/static-hello-world/static-hello-world';
import { NotFound } from 'src/components/not-found/not-found';

export const routesConfig = [
  {
    key: 'counter',
    path: '/counter',
    component: DynamicCounter,
  },
  {
    key: 'data',
    path: '/data',
    component: Data,
  },
  {
    key: 'home',
    path: '/',
    exact: true,
    component: StaticHelloWorld,
  },
  {
    key: 'not-found',
    component: NotFound,
  },
];
