import express from 'express';
import authenticate from '../middlewares/authenticate';

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
    select: ['id', 'category', 'audit_id', 'created_at', 'network'],
    where: { id },
  }).fetch({ withRelated: ['machines.vulnerabilities', 'machines.servicePorts', 'audits'] }).then((scan) => {
    const scanItem = scan.toJSON();
    scanItem.vulnerabilities = [];
    if (scanItem.audits.client_id === userId) {
      scanItem.audit_date = scanItem.audits.created_at;
      delete scanItem.audits;
      for (let i = 0; i < scanItem.machines.length; i += 1) {
        const machine = scanItem.machines[i];
        delete machine.confirmed;
        delete machine.content_filled;
        delete machine.high_vuln_nmbr;
        delete machine.info_vuln_nmbr;
        delete machine.low_vuln_nmbr;
        delete machine.medium_vuln_nmbr;
        delete machine.locked;
        delete machine.source;
        delete machine.source_id;
        delete machine.client_id;
        delete machine.created_at;
        delete machine.updated_at;
        delete machine.group_id;
        delete machine.os_family;

        if (!machine.operating_system) {
          machine.operating_system = '';
        }

        for (let j = 0; j < machine.vulnerabilities.length; j += 1) {
          const vuln = machine.vulnerabilities[j];
          if (vuln.risk_factor === 4) vuln.risk_factor = 3;
          vuln.count = 1;
          vuln.relatedMachines = [
            {
              machine_id: machine.id,
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
                machine_id: machine.id,
                vuln_id: vuln.id,
              },
            );
          }
        }

        for (let j = 0; j < machine.servicePorts.length; j += 1) {
          const port = machine.servicePorts[j];
          delete port.locked;
          delete port.source;
          delete port.source_id;
          delete port.state;
          delete port.output_excel;
          delete port.created_at;
          delete port.updated_at;
        }
      }
      scanItem.vulnerabilities.sort((a, b) => {
        if (a.risk_factor < b.risk_factor) return 1;
        if (a.risk_factor > b.risk_factor) return -1;
        if (a.count < b.count) return 1;
        if (a.count > b.count) return -1;
        return a.title.localeCompare(b.title);
      });
      scanItem.machines.forEach((machine) => {
        machine.vulnerabilities.sort((a, b) => {
          if (a.risk_factor < b.risk_factor) return 1;
          if (a.risk_factor > b.risk_factor) return -1;
          if (a.count < b.count) return 1;
          if (a.count > b.count) return -1;
          return a.title.localeCompare(b.title);
        });
      });
      res.json(scanItem);
    } else {
      res.status(404).json({});
    }
  });
});

export default router;
