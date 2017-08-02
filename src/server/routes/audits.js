import express from 'express';
import authenticate from '../middlewares/authenticate';
import Audits from '../models/audits';

const router = express.Router();
router.use(authenticate);

router.get('/:identifier', (req, res) => {
  Audits.query({
    select: ['id', 'category', 'created_at', 'closed_at'],
    where: { client_id: req.params.identifier },
  }).fetch().then((audits) => {
    res.json({ audits });
  });
});

router.get('/', (req, res) => {
  const userId = req.currentUser.id;
  Audits.query({
    select: ['id', 'category', 'created_at', 'closed_at', 'serial_number'],
    where: { client_id: userId },
  }).fetchAll({ withRelated: ['scans', 'webScans'] }).then((audits) => {
    const auditList = audits.toJSON();
    auditList.forEach((audit) => {
      if (audit.scans && audit.scans.length !== 0) {
        audit.scans.forEach((scan) => {
          delete scan.locked;
          delete scan.state;
          delete scan.audit_id;
          delete scan.client_id;
        });
      }
      if (audit.webScans && audit.webScans !== 0) {
        audit.webScans.forEach((scan) => {
          delete scan.locked;
          delete scan.state;
          delete scan.audit_id;
          delete scan.client_id;
        });
      }
    });
    auditList.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    res.json(auditList);
  });
});

export default router;
