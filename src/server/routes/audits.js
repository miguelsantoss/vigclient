import express from 'express';
// import authenticate from '../middlewares/authenticate';
import Audits from '../models/audits';

const router = express.Router();

router.get('/:identifier', (req, res) => {
  Audits.query({
    select: ['id', 'category', 'created_at', 'closed_at'],
    where: { client_id: req.params.identifier },
  }).fetch().then((audits) => {
    res.json({ audits });
  });
});

export default router;
