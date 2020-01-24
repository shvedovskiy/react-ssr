import { Router } from 'express';

import { loadData } from '../api/load-data';
import { createRenderer } from '../renderer';
import { API_PATH } from 'config/env';

export default function renderer(entrypoints, fs) {
  const renderHTML = createRenderer(entrypoints, fs);

  function rendererMiddleware(req, res) {
    renderHTML(req, res)
      .then(content => res.send(content))
      .catch(err => {
        res.starus(500).json({
          message: err.message,
          stack: err.stack,
        });
      });
  }

  const router = new Router();
  router.get(API_PATH, async (req, res) => {
    try {
      res.json(await loadData(req.query.url));
    } catch (err) {
      res.status(500).json({
        message: err.message,
        stack: err.stack,
      });
    }
  });
  router.get('/*', rendererMiddleware);
  return router;
}
