const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const { Listing } = require('../models/Listing');
const { User } = require('../models/User');
const { N8nService } = require('../services/n8n');
const router = express.Router();
const n8nService = new N8nService();

// Submit lead for a property
router.post('/:listingId', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const listingId = req.params.listingId;

    // Get listing details
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Get agent details
    const agent = await User.findById(listing.user_id);

    // Trigger n8n workflow for lead notification
    await n8nService.generateLeadNotification({
      agentName: agent.name,
      agentEmail: agent.email,
      propertyTitle: listing.title,
      leadName: name,
      leadEmail: email,
      leadPhone: phone,
      leadMessage: message,
      googleSheetUrl: process.env.GOOGLE_SHEET_URL,
    });

    res.json({ message: 'Lead submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;