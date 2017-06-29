import express from 'express';

const apiRoutes = express.Router();

apiRoutes.get('/', (req, res) => {
  res.json({ message: 'hello world' });
});

export default apiRoutes;
