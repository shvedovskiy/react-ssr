import { matchPath } from 'react-router-dom';

import { routesConfig } from 'routes-config';

const DATA_SOURCES = {
  data(route) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ user: 'Test' });
      }, 30);
    });
  },
};

export function loadData(url) {
  let route;
  const routeConfig = routesConfig.find(({ path }) => (route = matchPath(url, path)));

  if (route && DATA_SOURCES[routeConfig.key]) {
    return DATA_SOURCES[routeConfig.key](route);
  }
  return {};
}
