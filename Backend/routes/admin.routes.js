const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { authAdmin } = require('../middlewares/auth.middleware'); // ✅ destructured

// public route
router.post('/login', adminController.login);

// route to verify token
router.get('/check-auth', authAdmin, (req, res) => {
  res.json({ message: 'Authorized', admin: req.admin });
});


// protected admin routes
router.get('/dashboard', authAdmin, adminController.getDashboard);

// user management
router.get('/users', authAdmin, adminController.getUsers);
router.get('/users/:id', authAdmin, adminController.getUserById);
router.delete('/users/:id', authAdmin, adminController.deleteUser);

// captain management
router.get('/captains', authAdmin, adminController.getCaptains);
router.get('/captains/:id', authAdmin, adminController.getCaptainById);
router.delete('/captains/:id', authAdmin, adminController.deleteCaptain);

// ride management
router.get('/rides', authAdmin, adminController.getRides);
router.get('/rides/:id', authAdmin, adminController.getRideById);
router.delete('/rides/:id', authAdmin, adminController.deleteRide);
router.patch('/rides/:id/status', authAdmin, adminController.updateRideStatus);

module.exports = router;
