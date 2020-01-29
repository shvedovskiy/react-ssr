import { Router } from 'express';

// import { loadData } from '../api/load-data';
import { createRenderer } from '../renderer';
import { addStore } from './add-store';

export default function renderMiddleware(entrypoints, fs) {
  const renderer = createRenderer(entrypoints, fs);

  const router = new Router();
  // router.get(process.env.API_PATH || '/api/data', async (req, res) => {
  //   try {
  //     res.json(await loadData(req.query.url));
  //   } catch (err) {
  //     res.status(500).json({
  //       message: err.message,
  //       stack: err.stack,
  //     });
  //   }
  // });
  router.use(addStore);
  router.get('/*', renderer);

  return router;
}
