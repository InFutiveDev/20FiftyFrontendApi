const Contact = require('../models/Contact');

// @desc    Create a new contact form submission
// @route   POST /api/contact
// @access  Public
exports.createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({
      success: true,
      data: contact,
      message: 'Contact form submitted successfully'
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: error.message
    });
  }
};

// @desc    Get all contact form submissions with pagination and filtering
// @route   GET /api/contact
// @access  Public
// @query   page, limit, namn, telefon
exports.getAllContacts = async (req, res) => {
  try {
    // Extract query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Build filter object
    const filter = {};
    
    // Filter by name (case-insensitive partial match)
    if (req.query.namn) {
      filter.namn = { $regex: req.query.namn, $options: 'i' };
    }
    
    // Filter by phone (partial match)
    if (req.query.telefon) {
      filter.telefon = { $regex: req.query.telefon, $options: 'i' };
    }
    
    // Get total count for pagination
    const total = await Contact.countDocuments(filter);
    
    // Calculate total pages
    const totalPages = Math.ceil(total / limit);
    
    // Fetch contacts with pagination and filtering
    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    res.status(200).json({
      success: true,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalItems: total,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: error.message
    });
  }
};

// @desc    Get a single contact form submission
// @route   GET /api/contact/:id
// @access  Public
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid contact ID'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: error.message
    });
  }
};

// @desc    Delete a contact form submission
// @route   DELETE /api/contact/:id
// @access  Public
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {},
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid contact ID'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: error.message
    });
  }
};