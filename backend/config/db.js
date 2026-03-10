const mongoose = require('mongoose');
const Category = require('../models/Category');
const Account = require('../models/Account');
const { createDummyExcelForAllUsers } = require('../utils/excelGenerator');

const connectDB = async () => {
  try {
    // MongoDB Connection with improved error handling
    await mongoose.connect('YOUR_MONGO_DB_ATLAS_URL', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');

    // Ensure indexes are created after connection
    await Category.createIndexes();
    await Account.createIndexes();
    console.log('Indexes ensured');
    await createDummyExcelForAllUsers(); 

  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit if MongoDB fails to connect
  }
};

module.exports = connectDB;
