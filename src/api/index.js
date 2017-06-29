import express from 'express';
import db from './db';

const apiRoutes = express.Router();

apiRoutes.get('/audits', (req, res) => {
  db.query('select * from audits', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

apiRoutes.get('/machines', (req, res) => {
  db.query('select * from machines', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

apiRoutes.get('/pages', (req, res) => {
  db.query('select * from pages', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

apiRoutes.get('/scans', (req, res) => {
  db.query('select * from scans', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

apiRoutes.get('/service_ports', (req, res) => {
  db.query('select * from service_ports', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

apiRoutes.get('/vulnerabilities', (req, res) => {
  db.query('select * from vulnerabilities', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

apiRoutes.get('/web_vulnerabilities', (req, res) => {
  db.query('select * from web_vulnerabilities', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

export default apiRoutes;
