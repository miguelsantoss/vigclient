import express from 'express';
import authenticate from '../middlewares/authenticate';
import Client from '../models/clients';

const router = express.Router();
router.use(authenticate);

router.get('/', (req, res) => {
  const userId = req.currentUser.id;
  Client.where({ id: userId }).fetch().then((info) => {
    res.json(info);
  });
});

export default router;

