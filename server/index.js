import fs from 'fs';
import path from 'path';
import http from 'http';
import express from 'express';
import cors from 'cors';
import chalk from 'chalk';
import favicon from 'serve-favicon';
// import expressStaticGzip from 'express-static-gzip';

import { HTTPS, HOST, PORT } from '../config/env';
import { paths } from '../config/settings';
import renderer from './middleware/renderer';
import errorHandler from './middleware/error-handler';

const serverURL = `http${HTTPS ? 's' : ''}://${HOST}:${PORT || ''}`;
const app = express();

app.use(cors(/*{ origin: FRONTEND_URL, credentials: true }*/));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(paths.client.output, 'favicon.ico')));
app.use(express.static(paths.client.output));
// app.use(expressStaticGzip(paths.client.output, {
//   enableBrotli: true,
//   orderPreference: ['br'],
//   serveStatic: {
//     maxAge: 31536000
//   }
// }));

app.get('/favicon.ico', (req, res) => {
  res.redirect('https://yandex.st/lego/_/pDu9OWAQKB0s2J9IojKpiS_Eho.ico');
});

let manifest;
try {
  manifest = JSON.parse(fs.readFileSync(paths.manifestPath, { encoding: 'utf8' }));
} catch (err) {
  throw new Error('Asset Manifest could not be loaded: ', err);
}

app.use(renderer(manifest.entrypoints));
app.use(errorHandler);
app.set('port', PORT);

const server = http.createServer(app);

function onError(err) {
  if (err.syscall !== 'listen') {
    throw err;
  }
  switch (err.code) {
    case 'EACCES':
      console.error(`Port ${PORT} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`Port ${PORT} is already in use`);
      process.exit(1);
      break;
    default:
      throw err;
  }
}

function onListening() {
  console.info(chalk.blue(`🚀 Server running at ${serverURL}`));
}

server.listen(PORT);
server.on('error', onError);
server.on('listening', onListening);
