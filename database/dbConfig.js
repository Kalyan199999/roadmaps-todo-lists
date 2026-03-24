const mongoose = require("mongoose");

const connectDB = async () => 
{
  try 
  {
    const conn = await mongoose.connect(process.env.CONNECTION_URI);

    console.log(`Database is connected successfully! Host: ${conn.connection.host}`);

    // You can also listen for events after the initial connection is established
    mongoose.connection.on('error', err => {
      console.error('Database error after initial connection:', err.message);
    });
  } 
  catch (error) 
  {
    console.error(`Database connection failed: ${error.message}`);
    // Exit process with failure if initial connection fails
    process.exit(1);
  }
};

module.exports = connectDB;