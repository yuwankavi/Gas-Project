//the library used to define schemas 

const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  name: String,
  address: String,
  location: {
    type: {
      type: String, // 'Point'
      enum: ['Point'],//when storing a geographic point
      required: true
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true
    }
  }
});

//2D sphere model=> used to "Find all sellers within 5 km"

sellerSchema.index({ location: '2dsphere' }); // For geospatial queries

module.exports = mongoose.model('Seller', sellerSchema);
