const express = require('express');
const router = express.Router();
const {
  createContact,
  getAllContacts,
  getContact,
  deleteContact
} = require('../controllers/contactController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Contact routes
router.post('/', createContact);
router.get('/',authMiddleware, getAllContacts);
router.get('/:id', getContact);
router.delete('/:id', deleteContact);

module.exports = router;