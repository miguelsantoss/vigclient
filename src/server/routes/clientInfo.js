import express from 'express';
import Client from '../models/clientInfo';

const router = express.Router();

router.get('/:identifier', (req, res) => {
  Client.query({
    select: ['id', 'nif', 'name', 'address', 'postal_code',
      'location', 'telephone', 'district'],
    where: { id: req.params.identifier },
  }).fetch().then((client) => {
    res.json({ client });
  });
});

export default router;
