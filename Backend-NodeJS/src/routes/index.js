const express = require('express');
const auth = require('./../util/auth.js');
const session = require('express-session')
const router = express.Router();

const globalRoutes = require('./../domains/signup');
const loginRoutes = require('../domains/login');
<<<<<<< HEAD
const clientProfileRoutes = require('../domains/client_profile');
const clientAccountRoutes = require('../domains/client_account');
const volunteerProfileRoutes = require('../domains/volunteer_profile');
const volunteerAccountRoutes = require('../domains/volunteer_account');
=======
const stuckDriverProfileRoutes = require('../domains/stuck_driver_profile');
>>>>>>> 4ae7bdd63e62b675c82116e21118a9e7b93ce496

// Auth middleware
router.use("/client", session({ secret: "fingerprint_client", resave: true, saveUninitialized: true }))
router.use("/client/auth/*", auth);

router.use("/volunteer", session({ secret: "fingerprint_volunteer", resave: true, saveUninitialized: true }))
router.use("/volunteer/auth/*", auth);

// Routes
router.use('/', globalRoutes);
router.use('/client', loginRoutes);
router.use('/volunteer', loginRoutes);
<<<<<<< HEAD
router.use('/client/auth', clientProfileRoutes);
router.use('/client/auth', clientAccountRoutes);
router.use('/volunteer/auth', volunteerProfileRoutes);
router.use('/volunteer/auth', volunteerAccountRoutes);
=======
router.use('/stuck_driver/auth', stuckDriverProfileRoutes);
>>>>>>> 4ae7bdd63e62b675c82116e21118a9e7b93ce496

module.exports = router;
