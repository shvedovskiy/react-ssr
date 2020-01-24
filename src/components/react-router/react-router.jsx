import React from 'react';
import { Route } from 'react-router-dom';

import { ReactRouterNavigation } from './react-router-navigation';
import { routesConfig } from 'routes-config';
import { ReactRouterSwitch } from './react-router-switch';

export const ReactRouter = () => (
  <section className="section">
    <ReactRouterNavigation />
    <div className="section__content">
      <ReactRouterSwitch>
        {routesConfig.map(route => (
          <Route {...route} />
        ))}
      </ReactRouterSwitch>
    </div>
  </section>
);
