// import path from 'path';
import express from 'express';
// import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';
import mysql from 'mysql';
import morgan from 'morgan';
// import fetch from 'node-fetch';
import config from './config';
import apiRoutes from './api';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
}

app.use('/api', apiRoutes);

app.listen(config.port, () => {
  console.info(`The server is running at http://localhost:${config.port}/`);
});
