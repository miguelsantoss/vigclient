import express from 'express';
import authenticate from '../middlewares/authenticate';

import Vulnerabilities from '../models/vulnerabilities';

const router = express.Router();
router.use(authenticate);

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const userId = req.currentUser.id;
  Vulnerabilities.query({
    select: ['category', 'id', 'machine_id', 'vid', 'title',
      'summary', 'impact', 'solution', 'example', 'cvss_score',
      'exploitable', 'screen_shot', 'port_number', 'protocol', 'risk_factor',
      'output', 'description', 'category', 'client_id',
    ],
    where: { id },
  }).fetch({ withRelated: 'clients' }).then((vuln) => {
    const vulnItem = vuln.toJSON();
    delete vulnItem.created_at;
    delete vulnItem.updated_at;
    if (vulnItem.clients.id === userId) {
      delete vulnItem.clients;
      if (vulnItem.risk_factor > 3) vulnItem.risk_factor = 3;
      vulnItem.machinesWithVuln = [vulnItem.machine_id];
      Vulnerabilities.query({
        select: ['category', 'id', 'machine_id', 'vid', 'title',
          'summary', 'impact', 'solution', 'example', 'cvss_score',
          'exploitable', 'screen_shot', 'port_number', 'protocol', 'risk_factor',
          'output', 'description', 'category', 'client_id',
        ],
        where: { vid: vulnItem.vid },
      }).fetchAll({ withRelated: ['clients', 'machines'] }).then((vuln2) => {
        const vulnItem2 = vuln2.toJSON();
        vulnItem2.forEach((v) => {
          if (v.clients.id === userId) {
            vulnItem.machinesWithVuln.push(v.machine_id);
          }
        });
      });
      res.send(vulnItem);
    } else {
      res.status(404);
    }
  });
});

export default router;

