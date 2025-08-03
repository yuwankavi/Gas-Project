const express = require('express');
const router = express.Router();
const Seller = require('../models/seller');

// Add a new seller
router.post('/', async (req, res) => {
  try {
    const seller = new Seller(req.body);
    await seller.save();
    res.status(201).json(seller);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get sellers near a location (for frontend compatibility) - SORTED BY DISTANCE
router.get('/nearby', async (req, res) => {
  const { lng, lat, maxDistance = 5000 } = req.query; // maxDistance in meters
  if (!lng || !lat) {
    return res.status(400).json({ error: 'lng and lat are required' });
  }
  try {
    const sellers = await Seller.find({
      location: {
        $nearSphere: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseInt(maxDistance)
        }
      }
    }).sort({ location: 1 }); // Explicitly sort by location (distance)
    
    console.log(`Found ${sellers.length} sellers near [${lng}, ${lat}]`);
    res.json(sellers);
  } catch (err) {
    console.error('Error in nearby search:', err);
    res.status(500).json({ error: err.message });
  }
});

// Enhanced version with distance calculation
router.get('/nearby-with-distance', async (req, res) => {
  const { lng, lat, maxDistance = 5000 } = req.query;
  if (!lng || !lat) {
    return res.status(400).json({ error: 'lng and lat are required' });
  }
  try {
    const sellers = await Seller.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          distanceField: 'distance',
          spherical: true,
          maxDistance: parseInt(maxDistance),
          distanceMultiplier: 0.001 // Convert to kilometers
        }
      },
      {
        $project: {
          name: 1,
          address: 1,
          location: 1,
          distance: { $round: ['$distance', 2] }
        }
      }
    ]);
    
    console.log(`Found ${sellers.length} sellers near [${lng}, ${lat}]`);
    res.json(sellers);
  } catch (err) {
    console.error('Error in nearby search:', err);
    res.status(500).json({ error: err.message });
  }
});

// Alternative route with $near (also sorts by distance)
router.get('/near', async (req, res) => {
  const { lng, lat, maxDistance = 5000 } = req.query; // maxDistance in meters
  if (!lng || !lat) {
    return res.status(400).json({ error: 'lng and lat are required' });
  }
  try {
    const sellers = await Seller.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseInt(maxDistance)
        }
      }
    });
    res.json(sellers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
