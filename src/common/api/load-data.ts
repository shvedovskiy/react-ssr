import { Dispatch } from 'redux';
import { matchRoutes } from 'react-router-config';

import { fetchRoutes } from './fetch-routes';
import { FetchingRoute, RouteConfig } from './types';

export async function loadData(
  dispatch: Dispatch,
  currentRoute: FetchingRoute,
  prevRoute: FetchingRoute | null = null,
) {
  const branch = matchRoutes(fetchRoutes, currentRoute.pathname);
  for (const { route, match } of branch) {
    if ((route as RouteConfig).fetch) {
      await dispatch(
        route.fetch(
          {
            ...currentRoute,
            params: match.params,
          } as FetchingRoute,
          prevRoute,
        ),
      );
    }
  }
}
