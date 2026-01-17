const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const options = {
      serverSelectionTimeoutMS: 10000, // Timeout after 10s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    };
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    
    if (error.message.includes('ENOTFOUND') || error.message.includes('querySrv')) {
      console.error('\n⚠️  DNS Resolution Error - Possible causes:');
      console.error('1. MongoDB Atlas cluster might be paused (free tier pauses after inactivity)');
      console.error('2. Check your network connection');
      console.error('3. Verify the connection string in your .env file');
      console.error('4. If using MongoDB Atlas, ensure the cluster is running in the Atlas dashboard');
    } else if (error.message.includes('authentication')) {
      console.error('\n⚠️  Authentication Error - Check your username and password');
    } else {
      console.error('Please check your MongoDB connection string and network connectivity.');
    }
    
    process.exit(1);
  }
};

module.exports = connectDB;