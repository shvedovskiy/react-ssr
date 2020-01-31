import { Request, Response, NextFunction } from 'express';

import { configureStore } from 'src/store';

export function addStore(req: Request, res: Response, next: NextFunction) {
  res.locals.store = configureStore();
  next();
}
