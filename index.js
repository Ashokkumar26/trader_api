const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const tradeRoutes = require("./routes/trades")

const app = express();
app.use(cors());
app.use(express.json());

const url = 'mongodb+srv://koshakkumar3_db_user:iO8uEPc0QJoZwcIP@trades.drcw7rl.mongodb.net/trader?retryWrites=true&w=majority';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(url, options)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });
  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
  });
  
  mongoose.connection.on('error', (error) => {
    console.error('Mongoose connection error:', error);
  });
  
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from MongoDB');
  });
  
  // Gracefully close the connection on application termination
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose connection closed due to application termination');
      process.exit(0);
    });
  });

app.use("/trader", tradeRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
 