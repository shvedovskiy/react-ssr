import { matchRoutes } from 'react-router-config';

import { fetchRoutes } from './routes';

// const DATA_SOURCES = {
//   data(route) {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve({ user: 'Test' });
//       }, 30);
//     });
//   },
// };

// export function loadData(req) {
//   const matchingRoutes = matchRoutes(routes, req.url);

//   const promises = matchingRoutes.map(({ route, match }) => {
//     return route.loadData ? route.loadData(match) : Promise.resolve(null);
//   });
//   return Promise.all(promises);
// }

export async function loadData(dispatch, location, prevLocation = null) {
  const branch = matchRoutes(fetchRoutes, location.pathname);
  // [
  //   {
  //     route: { path: '/', exact: false, fetch: [(Function: fetchGlobalAppData)] },
  //     match: { path: '/', url: '/', isExact: true, params: {} },
  //   },
  // ];
  for (const { route, match } of branch) {
    await dispatch(
      route.fetch(
        {
          ...location,
          params: match.params,
        },
        prevLocation,
      ),
    );
  }
}
