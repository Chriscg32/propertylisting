const express = require('express');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { User } = require('../models/User');
const router = express.Router();

// Get user stats
router.get('/:id/stats', authMiddleware, async (req, res) => {
  try {
    // Check if user is requesting their own stats or is admin
    if (req.params.id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Get user's listings count
    const listingsResponse = await fetch(`${req.protocol}://${req.get('host')}/api/listings/user/listings`, {
      headers: {
        'Authorization': `Bearer ${req.header('Authorization')?.replace('Bearer ', '')}`
      }
    });
    const listings = await listingsResponse.json();
    
    // Calculate stats
    const totalListings = listings.length;
    const totalViews = listings.reduce((sum, listing) => sum + (listing.views || 0), 0);
    const leadsGenerated = listings.reduce((sum, listing) => sum + (listing.leads || 0), 0);
    const conversionRate = totalViews > 0 ? ((leadsGenerated / totalViews) * 100).toFixed(1) : 0;

    res.json({
      totalListings,
      totalViews,
      leadsGenerated,
      conversionRate: parseFloat(conversionRate),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user activities
router.get('/:id/activities', authMiddleware, async (req, res) => {
  try {
    // Check if user is requesting their own activities or is admin
    if (req.params.id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Mock activities for now
    const activities = [
      {
        id: '1',
        type: 'view',
        title: 'Sandton Family Home',
        description: 'Viewed by 12 people today',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '2',
        type: 'lead',
        title: 'Camps Bay Apartment',
        description: 'New lead from John Smith',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '3',
        type: 'enhancement',
        title: 'Umhlanga Beach House',
        description: 'AI enhanced images and description',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    res.json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user properties
router.get('/:id/properties', authMiddleware, async (req, res) => {
  try {
    // Check if user is requesting their own properties or is admin
    if (req.params.id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const listingsResponse = await fetch(`${req.protocol}://${req.get('host')}/api/listings/user/listings`, {
      headers: {
        'Authorization': `Bearer ${req.header('Authorization')?.replace('Bearer ', '')}`
      }
    });
    const properties = await listingsResponse.json();

    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;