import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import morgan from 'morgan';
import routes from './routes';
import config from '../config';

const app = express();
const publicFolder = path.join(__dirname, '../../build');

// Don't expose any software information
app.disable('x-powered-by');

// Use morgan for logging
// FIXME: log into file for prod?
if (app.get('env') === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

// Use body parser to parse json from messages
app.use(bodyParser.json());

// Use Gzip to compress the responses
app.use(compression());
app.use('/api', routes);
app.use(express.static(publicFolder));

const server = app.listen(config.port, () => {
  const port = server.address().port;
  console.info(`App now running on port ${port}`);
});

export default server;
