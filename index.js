const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const tradeRoutes = require("./routes/trades")
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const connectDB = async () => {
   try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 20000,
      connectTimeoutMS: 20000,
      socketTimeoutMS: 45000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

app.use("/trader", tradeRoutes);

// Connect to MongoDB first, then start the server
const startServer = async () => {
  try {
    await connectDB();
    
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();