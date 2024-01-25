const express = require('express');
const auth = require('./../util/auth.js');
const session = require('express-session')
const router = express.Router();

const globalRoutes = require('./../domains/signup');
const clientLoginRoutes = require('../domains/client_login');
const volunteerLoginRoutes = require('../domains/volunteer_login');
const clientProfileRoutes = require('../domains/client_profile');
const clientAccountRoutes = require('../domains/client_account');
const clientIssueRoutes = require('../domains/client_issue');
const volunteerProfileRoutes = require('../domains/volunteer_profile');
const volunteerAccountRoutes = require('../domains/volunteer_account');

// Auth middleware
router.use("/client", session({ secret: "fingerprint_client", resave: true, saveUninitialized: true }))
router.use("/client/auth/*", auth);

router.use("/volunteer", session({ secret: "fingerprint_volunteer", resave: true, saveUninitialized: true }))
router.use("/volunteer/auth/*", auth);

// Global Routes
router.use('/', globalRoutes);

// Client Routes
router.use('/client', clientLoginRoutes);
router.use('/client/auth', clientProfileRoutes);
router.use('/client/auth', clientAccountRoutes);
router.use('/client/auth', clientIssueRoutes);

// Volunteer Routes
router.use('/volunteer', volunteerLoginRoutes);
router.use('/volunteer/auth', volunteerProfileRoutes);
router.use('/volunteer/auth', volunteerAccountRoutes);

module.exports = router;
