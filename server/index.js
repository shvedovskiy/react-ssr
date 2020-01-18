import path from 'path';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import manifestHelpers from 'express-manifest-helpers';

import { PORT } from '../config/env';
import { paths } from '../config/settings';
import { renderer } from './middleware/renderer';

const app = express();

app.use(express.static(path.join(paths.client.output)));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(manifestHelpers({
  manifestPath: path.join(paths.client.output, paths.publicPath, 'manifest.json')
}));
app.use(renderer());

app.listen(PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.info(`Server running at ${PORT}`);
  }
});
