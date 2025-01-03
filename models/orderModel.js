const mongoose = require('mongoose');

// Define the order schema
const orderSchema = new mongoose.Schema({
  items: [String],  // Store only the dish names as strings
  totalPrice: Number,
  orderDate: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' }, // status can be "Pending", "Confirmed", etc.
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
