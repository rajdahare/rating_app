const { Store, Rating, User } = require('../models');
const { Op } = require('sequelize');
const Joi = require('joi');

const getAllStores = async (req, res) => {
  try {
    const { name, address, sortBy, sortOrder } = req.query;
    const where = {};

    if (name) where.name = { [Op.like]: `%${name}%` };
    if (address) where.address = { [Op.like]: `%${address}%` };

    const order = [];
    if (sortBy) {
        order.push([sortBy, sortOrder === 'desc' ? 'DESC' : 'ASC']);
    }

    const stores = await Store.findAll({
      where,
      order,
      include: [
        {
          model: Rating,
          as: 'ratings',
          required: false,
          where: req.user ? { userId: req.user.id } : undefined, // Include user's rating if logged in
          limit: 1 // Should be only one rating per user per store
        }
      ]
    });
    
    // Note: The `include` above with `where` might filter out stores if the user hasn't rated them if required is true.
    // If required is false, it returns the store, and if a rating exists, it's included.
    // However, Sequelize logic with `include` `where` can be tricky.
    // Better strategy: Fetch all stores, and if user is logged in, fetch their ratings separately or use a separate query or careful include.
    // Actually, `required: false` works for Left Join.

    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStoreDetails = async (req, res) => {
    // ...
};

const submitRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;
    const userId = req.user.id;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const store = await Store.findByPk(storeId);
    if (!store) return res.status(404).json({ message: 'Store not found' });

    let existingRating = await Rating.findOne({ where: { storeId, userId } });

    if (existingRating) {
      // Modify rating
      existingRating.rating = rating;
      await existingRating.save();
    } else {
      // Create rating
      await Rating.create({ storeId, userId, rating });
    }

    // Update Store Average Rating
    const allRatings = await Rating.findAll({ where: { storeId } });
    const avg = allRatings.reduce((acc, curr) => acc + curr.rating, 0) / allRatings.length;
    
    store.rating = avg;
    await store.save();

    res.json({ message: 'Rating submitted', averageRating: avg });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyStoreStats = async (req, res) => {
  try {
    const userId = req.user.id;
    // Find store(s) owned by this user
    const stores = await Store.findAll({ 
        where: { ownerId: userId },
        include: [{
            model: Rating,
            as: 'ratings',
            include: [{ model: User, as: 'user', attributes: ['name', 'email'] }]
        }]
    });

    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllStores,
  submitRating,
  getMyStoreStats
};

