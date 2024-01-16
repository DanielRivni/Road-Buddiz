const express = require('express');
const auth = require('./../util/auth.js');
const session = require('express-session')
const router = express.Router();

const globalRoutes = require('./../domains/signup');
const loginRoutes = require('../domains/login');
const stuckDriverProfileRoutes = require('../domains/stuck_driver_profile');

// Auth middleware
router.use("/stuck_driver", session({ secret: "fingerprint_stuck_driver", resave: true, saveUninitialized: true }))
router.use("/stuck_driver/auth/*", auth);

router.use("/volunteer", session({ secret: "fingerprint_volunteer", resave: true, saveUninitialized: true }))
router.use("/volunteer/auth/*", auth);

// Routes
router.use('/', globalRoutes);
router.use('/stuck_driver', loginRoutes);
router.use('/volunteer', loginRoutes);
router.use('/stuck_driver/auth', stuckDriverProfileRoutes);

module.exports = router;
