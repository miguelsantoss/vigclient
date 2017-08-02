import express from 'express';
import authenticate from '../middlewares/authenticate';

import Audits from '../models/audits';
import Scans from '../models/scans';

const router = express.Router();
router.use(authenticate);

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const userId = req.currentUser.id;
  Scans.query({
    select: ['id', 'category', 'audit_id', 'created_at'],
    where: { id },
  }).fetch({ withRelated: ['machines'] }).then((scan) => {
    const scanItem = scan.toJSON();
    Audits.query({
      select: ['id', 'client_id'],
      where: { id: scanItem.audit_id },
    }).fetch().then((audit) => {
      const auditItem = audit.toJSON();
      if (auditItem.client_id === userId) {
        delete scanItem.audit_it;
        scanItem.machines.forEach((machineItem) => {
          delete machineItem.confirmed;
          delete machineItem.content_filled;
          delete machineItem.high_vuln_nmbr;
          delete machineItem.info_vuln_nmbr;
          delete machineItem.low_vuln_nmbr;
          delete machineItem.medium_vuln_nmbr;
          delete machineItem.locked;
          delete machineItem.source;
          delete machineItem.source_id;
          delete machineItem.client_id;
        });
        res.json(scanItem);
      } else res.status(404);
    });
  });
});

export default router;
