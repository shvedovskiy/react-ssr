import path from 'path';

import { NODE_ENV } from '../../config/env';

export default function errorHandler(err, req, res, next) {
  return res.status(404).json({
    status: 'error',
    message: err.message,
    stack: NODE_ENV === 'development' &&
      (err.stack || '')
        .split('\n')
        .map(line => line.trim())
        .map(line => line.split(path.sep).join('/'))
        .map(line => line.replace(process.cwd().split(path.sep).join('/'), '.'))
  });
}
