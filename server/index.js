// import express from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';

// import { PORT } from '../config/env';
// import { paths } from '../config/settings';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { PORT } = require('../config/env');
const { paths } = require('../config/settings');

const app = express();

app.use(paths.publicPath, express.static(paths.client.output));
app.use(express.static('build')); // TODO change to SSR

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.info(`Server running at ${PORT}`);
  }
});
