import mysql from 'mysql';
import config from '../config';

const connection = mysql.createConnection({
  host: config.databaseUrl,
  user: config.database.username,
  password: config.database.password,
  database: config.database.databaseDev,
});

connection.connect();
export default connection;
