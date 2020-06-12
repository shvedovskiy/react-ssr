import path from 'path';
import { Request, Response } from 'express';

export default function errorHandler(err: Error, req: Request, res: Response) {
  const { NODE_ENV = 'production' } = process.env;

  return res.status(404).json({
    status: 'error',
    message: err.message,
    stack:
      NODE_ENV === 'development' &&
      (err.stack ?? '')
        .split('\n')
        .map(line => line.trim())
        .map(line => line.split(path.sep).join('/'))
        .map(line => line.replace(process.cwd().split(path.sep).join('/'), '.')),
  });
}
