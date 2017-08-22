import express from 'express';
import authenticate from '../middlewares/authenticate';
import Pages from '../models/pages';

const router = express.Router();
router.use(authenticate);

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const userId = req.currentUser.id;
  Pages.query({
    select: ['id', 'url', 'client_id', 'audit_id'],
    where: { id },
  }).fetch({ withRelated: ['audits', 'webVulnerabilities'] }).then((page) => {
    const pageItem = page.toJSON();
    if (pageItem.client_id === userId) {
      delete pageItem.client_id;
      pageItem.audit_date = pageItem.audits.created_at;
      delete pageItem.audits;
      for (let i = 0; i < pageItem.webVulnerabilities.length; i += 1) {
        const vuln = pageItem.webVulnerabilities[i];
        if (vuln.risk_factor > 3) vuln.risk_factor = 3;
        delete vuln.source;
        delete vuln.source_id;
        delete vuln.status;
        delete vuln.img_allowed;
        delete vuln.locked;
        delete vuln.params_allowed;
        delete vuln.confirmed;
        delete vuln.content_revised;
        delete vuln.created_at;
        delete vuln.updated_at;
      }
      pageItem.webVulnerabilities.sort((a, b) => {
        if (a.risk_factor < b.risk_factor) return 1;
        if (a.risk_factor > b.risk_factor) return -1;
        return a.title.localeCompare(b.title);
      });
      res.json(pageItem);
    } else {
      res.status(404).json({});
    }
  });
});

export default router;

