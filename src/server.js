// import path from 'path';
import express from 'express';
// import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compress from 'compress';
// import fetch from 'node-fetch';
import config from './config';

const app = express();

app.use(compress());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(config.port, () => {
  console.info(`The server is running at http://localhost:${config.port}/`);
});
