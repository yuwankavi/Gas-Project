const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  name: String,
  address: String,
  location: {
    type: {
      type: String, // 'Point'
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true
    }
  }
});

sellerSchema.index({ location: '2dsphere' }); // For geospatial queries

module.exports = mongoose.model('Seller', sellerSchema);
