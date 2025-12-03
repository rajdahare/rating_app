const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Placeholder for user specific routes if any (e.g. profile update)
// router.get('/profile', protect, getUserProfile);

module.exports = router;

