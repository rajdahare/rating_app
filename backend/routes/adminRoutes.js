const express = require('express');
const router = express.Router();
const {
  addUser,
  addStore,
  getDashboardStats,
  getUsers,
  getStores
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);
router.use(authorize('admin'));

router.post('/users', addUser);
router.post('/stores', addStore);
router.get('/dashboard', getDashboardStats);
router.get('/users', getUsers);
router.get('/stores', getStores);

module.exports = router;

