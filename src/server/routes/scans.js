import express from 'express';
import authenticate from '../middlewares/authenticate';

import Audits from '../models/audits';
import Scans from '../models/scans';

const router = express.Router();
router.use(authenticate);

const vulnExists = (array, vid) => {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i].vid === vid) return i;
  }
  return false;
};

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const userId = req.currentUser.id;
  Scans.query({
    select: ['id', 'category', 'audit_id', 'created_at'],
    where: { id },
  }).fetch({ withRelated: ['machines.vulnerabilities'] }).then((scan) => {
    const scanItem = scan.toJSON();
    Audits.query({
      select: ['id', 'client_id'],
      where: { id: scanItem.audit_id },
    }).fetch().then((audit) => {
      const auditItem = audit.toJSON();
      scanItem.vulnerabilities = [];
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
          machineItem.vulnerabilities.forEach((vuln) => {
            vuln.count = 1;
            vuln.relatedMachines = [machineItem.id];
            const t = vulnExists(scanItem.vulnerabilities, vuln.vid);
            if (t !== 0 && !t) {
              scanItem.vulnerabilities.push(vuln);
            } else {
              scanItem.vulnerabilities[t].count += 1;
              scanItem.vulnerabilities[t].relatedMachines.push(machineItem.id);
            }
          });
        });
        res.json(scanItem);
      } else res.status(404);
    });
  });
});

export default router;
