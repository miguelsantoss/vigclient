import express from 'express';
import authenticate from '../middlewares/authenticate';
import Audits from '../models/audits';

const router = express.Router();
router.use(authenticate);

router.get('/:id', (req, res) => {
  const userId = req.currentUser.id;
  Audits.query({
    select: ['id', 'category', 'created_at', 'closed_at', 'serial_number', 'client_id'],
    where: { id: req.params.id },
  }).fetch({ withRelated: ['scans', 'pages'] }).then((audits) => {
    const auditItem = audits.toJSON();
    if (auditItem.client_id !== userId) {
      res.status(404).json({});
    } else {
      if (auditItem.scans) {
        auditItem.scans.forEach((scan) => {
          delete scan.locked;
          delete scan.state;
          delete scan.audit_id;
          delete scan.client_id;
          delete scan.created_at;
          delete scan.updated_at;
        });
      }
      if (auditItem.pages) {
        auditItem.pages.forEach((page) => {
          delete page.locked;
          delete page.state;
          delete page.audit_id;
          delete page.client_id;
          delete page.created_at;
          delete page.updated_at;
        });
      }
      res.json(auditItem);
    }
  });
});

router.get('/', (req, res) => {
  const userId = req.currentUser.id;
  Audits.query({
    select: ['id', 'category', 'created_at', 'closed_at', 'serial_number'],
    where: { client_id: userId },
  }).fetchAll({ withRelated: ['scans', 'pages'] }).then((audits) => {
    const auditList = audits.toJSON();
    auditList.forEach((audit) => {
      if (audit.scans && audit.scans.length !== 0) {
        audit.scans.forEach((scan) => {
          delete scan.locked;
          delete scan.state;
          delete scan.audit_id;
          delete scan.client_id;
          delete scan.created_at;
          delete scan.updated_at;
        });
      }
      if (audit.pages && audit.pages !== 0) {
        audit.pages.forEach((page) => {
          delete page.locked;
          delete page.state;
          delete page.audit_id;
          delete page.client_id;
          delete page.created_at;
          delete page.updated_at;
        });
      }
    });
    auditList.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    res.json(auditList);
  });
});

export default router;
