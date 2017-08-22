import express from 'express';
import authenticate from '../middlewares/authenticate';

import WebVulnerabilities from '../models/webVulnerabilities';

const router = express.Router();
router.use(authenticate);

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const userId = req.currentUser.id;
  WebVulnerabilities.query({
    select: ['*'],
    where: { id },
  }).fetch({ withRelated: 'pages.audits' }).then((vuln) => {
    const vulnItem = vuln.toJSON();
    if (vulnItem.client_id === userId) {
      vulnItem.audit_id = vulnItem.pages.audits.id;
      vulnItem.audit_date = vulnItem.pages.audits.created_at;
      vulnItem.page_url = vulnItem.pages.url;
      delete vulnItem.pages;
      delete vulnItem.client_id;
      delete vulnItem.created_at;
      delete vulnItem.updated_at;
      delete vulnItem.confirmed;
      delete vulnItem.content_revised;
      delete vulnItem.img_allowed;
      delete vulnItem.locked;
      delete vulnItem.params_allowed;
      delete vulnItem.source;
      delete vulnItem.source_id;
      delete vulnItem.status;
      if (vulnItem.risk_factor > 3) vulnItem.risk_factor = 3;
      res.send(vulnItem);
    } else {
      res.status(404).json({});
    }
  });
});

export default router;

