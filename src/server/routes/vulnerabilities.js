import express from 'express';
import authenticate from '../middlewares/authenticate';

import Vulnerabilities from '../models/vulnerabilities';

const router = express.Router();
router.use(authenticate);

router.get('/:id', (req, res) => {
  res.json({ ok: 'ok' });
});

export default router;

