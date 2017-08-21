import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import morgan from 'morgan';

import routes from './routes';

const app = express();

if (process.env.NODE_ENV === 'production') app.use(morgan('combined'));
else app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(compression());
app.use('/api', routes);

const server = app.listen(8080, () => {
  const port = server.address().port;
  console.info(`App now running on port ${port}`);
});
