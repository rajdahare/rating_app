const bcrypt = require('bcryptjs');
const { User, sequelize } = require('./models');

const resetAndCreateAdmin = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected...');

    // Delete existing admin if exists
    await User.destroy({ where: { email: 'admin@gmail.com' } });
    console.log('Cleared existing admin user...');

    // Create admin user with proper bcrypt hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Admin@123', salt);

    const admin = await User.create({
      name: 'Administrator Main User Account',
      email: 'admin@gmail.com',
      password: hashedPassword,
      address: '123 Admin Street, Administration City, State 12345',
      role: 'admin'
    });

    console.log('\n✅ Admin user created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email: admin@gmail.com');
    console.log('🔑 Password: Admin@123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\nYou can now login with these credentials!\n');
    
    // Test the password comparison
    const testMatch = await bcrypt.compare('Admin@123', admin.password);
    console.log(`Password verification test: ${testMatch ? '✅ PASS' : '❌ FAIL'}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

resetAndCreateAdmin();
