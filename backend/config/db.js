const Sequelize = require('sequelize');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Verify critical environment variables 
if (!process.env.JWT_SECRET) {
  console.error('❌ ERROR: JWT_SECRET is not set in .env file!');
  console.error('Please add: JWT_SECRET=your_secret_key_here');
  process.exit(1);
}

// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME || 'rating_app',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
  }
);

module.exports = sequelize;
