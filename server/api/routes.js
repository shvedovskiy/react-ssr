import { fetchGlobalAppData } from 'src/features/data/actions';

export const fetchRoutes = [
  {
    path: '/',
    exact: false,
    fetch: fetchGlobalAppData,
    // routes: [
    //   {
    //     path: '/',
    //     fetch: fetchHomePageData,
    //   },
    // ],
  },
];
