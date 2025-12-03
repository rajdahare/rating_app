const express = require('express');
const router = express.Router();
const { getAllStores, submitRating, getMyStoreStats } = require('../controllers/storeController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, authorize('normal_user', 'admin'), getAllStores); // Normal users list stores. Admin can too.
router.post('/rate', protect, authorize('normal_user'), submitRating);
router.get('/my-store', protect, authorize('store_owner'), getMyStoreStats);

module.exports = router;

