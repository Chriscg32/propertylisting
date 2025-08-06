const express = require('express');
const multer = require('multer');
const path = require('path');
const { authMiddleware } = require('../middleware/auth');
const { Listing } = require('../models/Listing');
const { Media } = require('../models/Media');
const { N8nService } = require('../services/n8n');
const router = express.Router();
const n8nService = new N8nService();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Get all listings
router.get('/', async (req, res) => {
  try {
    const filters = {
      propertyType: req.query.propertyType,
      minPrice: req.query.minPrice,
      maxPrice: req.query.maxPrice,
      bedrooms: req.query.bedrooms,
      location: req.query.location,
    };

    const listings = await Listing.findAll(filters);
    res.json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get listing by ID
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.json(listing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create listing
router.post('/', authMiddleware, upload.array('media', 20), async (req, res) => {
  try {
    const {
      title,
      propertyType,
      listingType,
      bedrooms,
      bathrooms,
      garages,
      floorSize,
      erfSize,
      address,
      suburb,
      city,
      province,
      postalCode,
      price,
      features,
    } = req.body;

    // Generate reference code
    const refCode = await Listing.generateRefCode();

    // Create listing
    const listing = await Listing.create({
      user_id: req.user.id,
      title,
      property_type: propertyType,
      listing_type: listingType,
      bedrooms,
      bathrooms,
      garages,
      floor_size: floorSize,
      erf_size: erfSize,
      address,
      suburb,
      city,
      province,
      postal_code: postalCode,
      price,
      features: features ? features.split(',') : [],
      ref_code: refCode,
      status: 'draft',
    });

    // Upload media files
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const mediaUrl = await Media.uploadFile(file, listing.id);
        await Media.create({
          listing_id: listing.id,
          type: file.mimetype.startsWith('image/') ? 'photo' : 'video',
          url: mediaUrl,
        });
      }
    }

    res.status(201).json({
      message: 'Listing created successfully',
      listing,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update listing
router.put('/:id', authMiddleware, upload.array('media', 20), async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Check if user owns the listing
    if (listing.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const {
      title,
      propertyType,
      listingType,
      bedrooms,
      bathrooms,
      garages,
      floorSize,
      erfSize,
      address,
      suburb,
      city,
      province,
      postalCode,
      price,
      features,
      status,
    } = req.body;

    // Update listing
    const updatedListing = await Listing.update(req.params.id, {
      title,
      property_type: propertyType,
      listing_type: listingType,
      bedrooms,
      bathrooms,
      garages,
      floor_size: floorSize,
      erf_size: erfSize,
      address,
      suburb,
      city,
      province,
      postal_code: postalCode,
      price,
      features: features ? features.split(',') : [],
      status,
    });

    // Upload new media files
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const mediaUrl = await Media.uploadFile(file, listing.id);
        await Media.create({
          listing_id: listing.id,
          type: file.mimetype.startsWith('image/') ? 'photo' : 'video',
          url: mediaUrl,
        });
      }
    }

    res.json({
      message: 'Listing updated successfully',
      listing: updatedListing,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete listing
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Check if user owns the listing
    if (listing.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Listing.delete(req.params.id);
    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's listings
router.get('/user/listings', authMiddleware, async (req, res) => {
  try {
    const listings = await Listing.findByUserId(req.user.id);
    res.json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;