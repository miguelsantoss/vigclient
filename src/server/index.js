import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import users from './routes/users';
import auth from './routes/auth';
import events from './routes/events';
import audits from './routes/audits';

// APP
const app = express();

app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/events', events);
app.use('/api/audits', audits);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
}

// eslint-disable-next-line no-console
app.listen(8080, () => console.log('running on localhost:8080'));
