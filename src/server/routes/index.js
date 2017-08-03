import express from 'express';
import users from './users';
import auth from './auth';
import events from './events';
import audits from './audits';
import profile from './profile';
import scans from './scans';
import vulnerabilities from './vulnerabilities';
import viz from './viz';

const router = express.Router();

router.use('/users', users);
router.use('/auth', auth);
router.use('/events', events);
router.use('/audits', audits);
router.use('/profile', profile);
router.use('/scan', scans);
router.use('/vulnerabilities', vulnerabilities);
router.use('/viz', viz);

export default router;
