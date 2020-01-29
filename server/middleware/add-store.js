import { configureStore } from 'src/store';
// import { loadData } from '../api/load-data';

export /* async */ function addStore(req, res, next) {
  // try {
  //   preloadedState = await loadData(req);
  // } catch (err) {
  //   res.status(500).json({
  //     message: err.message,
  //     stack: err.stack,
  //   });
  // }
  res.locals.store = configureStore();
  next();
}
