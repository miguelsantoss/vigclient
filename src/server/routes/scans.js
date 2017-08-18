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
  }).fetch({ withRelated: ['machines.vulnerabilities', 'machines.servicePorts'] }).then((scan) => {
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
          delete machineItem.created_at;
          delete machineItem.updated_at;
          delete machineItem.group_id;
          delete machineItem.os_family;
          if (!machineItem.operating_system) {
            machineItem.operating_system = '';
          }
          machineItem.vulnerabilities.forEach((vuln) => {
            if (vuln.risk_factor === 4) vuln.risk_factor = 3;
            vuln.count = 1;
            vuln.relatedMachines = [
              {
                machine_id: machineItem.id,
                vuln_id: vuln.id,
              },
            ];
            const t = vulnExists(scanItem.vulnerabilities, vuln.vid);
            if (t !== 0 && !t) {
              scanItem.vulnerabilities.push(vuln);
            } else {
              if (scanItem.vulnerabilities[t].risk_factor > 3) scanItem.vulnerabilities[t].risk_factor = 3;
              scanItem.vulnerabilities[t].count += 1;
              scanItem.vulnerabilities[t].relatedMachines.push(
                {
                  machine_id: machineItem.id,
                  vuln_id: vuln.id,
                },
              );
            }
          });
          machineItem.servicePorts.forEach((port) => {
            delete port.locked;
            delete port.source;
            delete port.source_id;
            delete port.state;
            delete port.output_excel;
            delete port.created_at;
            delete port.updated_at;
          });
        });
        res.json(scanItem);
      } else res.status(404);
    });
  });
});

export default router;
