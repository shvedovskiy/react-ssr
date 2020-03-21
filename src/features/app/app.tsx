import { hot } from 'react-hot-loader/root';
import React from 'react';
import { renderRoutes } from 'react-router-config';

import { Nav } from 'src/common/components/nav/nav';
import { withRouteHandling } from 'src/common/components/router/route-handler';
import { routes } from 'src/common/routes-config';

const AppComponent = () => (
  <>
    <Nav />
    {renderRoutes(routes)}
  </>
);
export const App = hot(withRouteHandling(AppComponent));
