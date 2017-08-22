import express from 'express';
import authenticate from '../middlewares/authenticate';

import Machines from '../models/machines';

const router = express.Router();
router.use(authenticate);

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const userId = req.currentUser.id;
  Machines.query({
    select: ['*'],
    where: { id },
  }).fetch({ withRelated: ['scan.audits', 'vulnerabilities'] }).then((machine) => {
    const machineItem = machine.toJSON();
    if (machineItem.client_id === userId) {
      machineItem.audit_id = machineItem.scan.audit_id;
      machineItem.audit_date = machineItem.audit_id.created_at;
      machineItem.scan_network = machineItem.scan.network;
      delete machineItem.scan;
      delete machineItem.confirmed;
      delete machineItem.content_filled;
      delete machineItem.locked;
      delete machineItem.low_vuln_nmbr;
      delete machineItem.medium_vuln_nmbr;
      delete machineItem.high_vuln_nmbr;
      delete machineItem.info_vuln_nmbr;
      delete machineItem.source;
      delete machineItem.source_id;
      delete machineItem.created_at;
      delete machineItem.updated_at;
      for (let i = 0; i < machineItem.vulnerabilities.length; i += 1) {
        const vuln = machineItem.vulnerabilities[i];
        if (vuln.risk_factor > 3) vuln.risk_factor = 3;
        delete vuln.created_at;
        delete vuln.updated_at;
        delete vuln.locked;
        delete vuln.source;
        delete vuln.source_id;
        delete vuln.confirmed;
        delete vuln.content_revised;
        delete vuln.output_allowed;
        delete vuln.added_manually;
      }
      res.json(machineItem);
    } else {
      res.status(404).json({});
    }
  });
});

export default router;
