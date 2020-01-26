import React from 'react';
import { Route } from 'react-router-dom';

import { ReactRouterNavigation } from './react-router-navigation';
import { ReactRouterSwitch } from './react-router-switch';
import { routesConfig } from 'src/routes-config';

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
