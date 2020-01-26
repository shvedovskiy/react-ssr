import { configureStore } from 'src/store/configure-store';
import { loadData } from '../api/load-data';

export default async function addStore(req, res, next) {
  let preloadedState;
  try {
    preloadedState = await loadData(req.url);
  } catch (err) {
    res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
  }
  res.locals.store = configureStore(preloadedState);
  next();
}
