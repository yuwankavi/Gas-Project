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

// Get sellers near a location (for frontend compatibility)
router.get('/nearby', async (req, res) => {
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

// Get sellers near a location (alternative route)
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
