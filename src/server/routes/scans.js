import express from 'express';
import Scan from '../models/scans';

const router = express.Router();

router.get('/:identifier', (req, res) => {
  Scan.query({
    select: ['id', 'hostname', 'ip_address', 'operating_system'],
    where: { id: req.params.identifier },
  }).fetch().then((scan) => {
    res.json({ scan });
  });
});

export default router;
