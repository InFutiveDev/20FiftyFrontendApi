const express = require('express');
const router = express.Router();
const {
  adminLogin,
  getAdminData,
  registerAdmin
} = require('../controllers/userController');
const {authMiddleware} = require('../middleware/authMiddleware');

// Admin login route
router.post('/admin/login', adminLogin);

// Protected route to get admin data
router.get('/admin/data', authMiddleware, getAdminData);

// Admin registration route
router.post('/admin/register', registerAdmin);

module.exports = router;