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
    if (auditItem.client_id === userId) {
      if (auditItem.scans) {
        for (let i = 0; i < auditItem.scans.length; i += 1) {
          const scan = auditItem.scans[i];
          delete scan.locked;
          delete scan.state;
          delete scan.audit_id;
          delete scan.client_id;
          delete scan.created_at;
          delete scan.updated_at;
        }
      }
      if (auditItem.pages) {
        for (let i = 0; i < auditItem.pages.length; i += 1) {
          const page = auditItem.pages[i];
          delete page.locked;
          delete page.state;
          delete page.audit_id;
          delete page.client_id;
          delete page.created_at;
          delete page.updated_at;
        }
      }
      res.json(auditItem);
    } else {
      res.status(404).json({});
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
    for (let i = 0; i < auditList.length; i += 1) {
      const auditItem = auditList[i];
      if (auditItem.scans) {
        for (let j = 0; j < auditItem.scans.length; j += 1) {
          const scan = auditItem.scans[j];
          delete scan.locked;
          delete scan.state;
          delete scan.audit_id;
          delete scan.client_id;
          delete scan.created_at;
          delete scan.updated_at;
        }
      }
      if (auditItem.pages) {
        for (let j = 0; j < auditItem.pages.length; j += 1) {
          const page = auditItem.pages[j];
          delete page.locked;
          delete page.state;
          delete page.audit_id;
          delete page.client_id;
          delete page.created_at;
          delete page.updated_at;
        }
      }
    }
    auditList.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    res.json(auditList);
  });
});

export default router;
