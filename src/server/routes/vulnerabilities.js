import express from 'express';
import Vulnerabilities from '../models/user';

const router = express.Router();

router.get('/', (req, res) => {
  Vulnerabilities.query({
    select: ['username', 'email'],
    where: { email: req.params.identifier },
    orWhere: { username: req.params.identifier },
  }).fetch().then((user) => {
    res.json({ user });
  });
});

export default router;
