const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  namn: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  företag: {
    type: String,
    required: [true, 'Company is required'],
    trim: true
  },
  epost: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  telefon: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  intresseområde: {
    type: String,
    required: [true, 'Välj tjänst'],
    enum: {
      values: ['Energikonsultation', 'Solprojekt', 'Mjukvara & IT-lösningar', 'Allmän rådgivning'],
      message: '{VALUE} is not a valid area of interest'
    }
  },
  föredragenTidFörMöte: {
    type: String,
    required: [true, 'Välj tid'],
    enum: {
      values: ['Förmiddag (09:00-12:00)', 'Eftermiddag (13:00-17:00)', 'Flexibel'],
      message: '{VALUE} is not a valid preferred time'
    }
  },
  meddelande: {
    type: String,
    required: [true, 'Berätta kort om ditt projekt eller dina behov...'],
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema);