const { User, Store, Rating } = require('../models');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const { Op } = require('sequelize');

const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;

const addUser = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(20).max(60).required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(passwordRegex).required(),
      address: Joi.string().max(400).required(),
      role: Joi.string().valid('admin', 'normal_user', 'store_owner').required()
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { name, email, password, address, role } = req.body;

    const userExists = await User.findOne({ where: { email } });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addStore = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      address: Joi.string().max(400).required(),
      ownerId: Joi.number().optional() // Admin might assign an owner
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const store = await Store.create(req.body);
    res.status(201).json(store);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();

    res.json({
      totalUsers,
      totalStores,
      totalRatings
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const { name, email, address, role, sortBy, sortOrder } = req.query;
    const where = {};

    if (name) where.name = { [Op.like]: `%${name}%` };
    if (email) where.email = { [Op.like]: `%${email}%` };
    if (address) where.address = { [Op.like]: `%${address}%` };
    if (role) where.role = role;

    const order = [];
    if (sortBy) {
        order.push([sortBy, sortOrder === 'desc' ? 'DESC' : 'ASC']);
    }

    const users = await User.findAll({
      where,
      order,
      include: [{
          model: Store,
          as: 'stores',
          attributes: ['rating']
      }]
    });
    
    // Transform to include rating for store owners if needed
    // The requirement says "If the user is a Store Owner, their Rating should also be displayed."
    // Since a user can have multiple stores in my model (hasMany), we might average them or pick one.
    // Assuming 1 store per owner for simplicity in display.

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStores = async (req, res) => {
  try {
     const stores = await Store.findAll();
     res.json(stores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addUser,
  addStore,
  getDashboardStats,
  getUsers,
  getStores
};

