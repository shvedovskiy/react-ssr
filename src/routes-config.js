import { DynamicCounter } from './components/dynamic-counter/dynamic-counter';
import { Data } from './components/data/data';
import { StaticHelloWorld } from './components/static-hello-world/static-hello-world';

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
];
