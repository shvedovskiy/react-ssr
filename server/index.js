import fs from 'fs';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import chalk from 'chalk';

import { HTTPS, HOST, PORT } from '../config/env';
import { paths } from '../config/settings';
import renderer from './middleware/renderer';
import errorHandler from './middleware/error-handler';

const serverURL = `http${HTTPS ? 's' : ''}://${HOST}:${PORT || ''}`;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(paths.client.output));

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

app.listen(PORT, err => {
  if (err) {
    console.error(chalk.red('Server is not started: ', err));
  } else {
    console.info(chalk.blue(`Server running at ${serverURL}`));
  }
});
