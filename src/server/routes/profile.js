import express from 'express';
import authenticate from '../middlewares/authenticate';
import Client from '../models/clients';

const router = express.Router();
router.use(authenticate);

router.get('/', (req, res) => {
  const userId = req.currentUser.id;
  Client.where({ id: userId }).fetch({ withRelated: ['contacts'] }).then((info) => {
    const infoItem = info.toJSON();
    infoItem.contacts.forEach((contact) => {
      delete contact.client_id;
      delete contact.id;
      delete contact.emergency;
      delete contact.comment;
    });
    res.json(infoItem);
  });
});

export default router;
