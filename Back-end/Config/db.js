const mongoose = require("mongoose");

const connectDB = async (req, res, next) => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Conntected to MongoDB Database ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error in Mongodb ${error}`);
  }
};

module.exports = { connectDB };
