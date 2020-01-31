import { readFileSync } from 'fs';
import { Router } from 'express';

import { createRenderer } from '../renderer';
import { addStore } from './add-store';

export default function renderMiddleware(
  entrypoints: string[],
  readFile: typeof readFileSync = readFileSync,
) {
  const renderer = createRenderer(entrypoints, readFile);

  const router = Router();
  // router.get(process.env.API_PATH || '/api/data', async (req, res) => {
  //   try {
  //     res.json(await data(req.query.url));
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
