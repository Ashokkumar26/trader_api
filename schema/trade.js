const mongoose = require('mongoose');

// Define a schema
const tradeSchema = new mongoose.Schema({
  investorName: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  investment: {
    type: Number,
    required: true,
  },
  side: {
    type: String,
    enum: ["Profit", "Loss"],
    required: true
  },
    profitLoss: {
    type: Number,
    required: true,
  },
  brokerage: {
    type: Number,
    required: true
  },
  percentage: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true
  },
    subCategory: {
    type: String,
    required: false
  },
    createdAt: {
    type: String,
    required: true
  }
});


const Trade = mongoose.model('trades', tradeSchema);

module.exports = { Trade }