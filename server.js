const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./models/User');
const Order = require('./models/orderModel'); // Import the order model

// Create an Express application
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/canteen')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });

// Signup route
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: 'Account created successfully!' });
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Check if password matches
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  res.status(200).json({ message: 'Login successful' });
});

// Route to handle order confirmation
app.post('/api/confirm-order', async (req, res) => {
  const cart = req.body.cart; // Get cart data from the request body

  // Extract only the dish names from the cart items
  const itemNames = cart.map(item => item.name);

  // Calculate the total price
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0); 

  try {
    const order = new Order({
      items: itemNames, // Save only the dish names
      totalPrice: totalPrice,
    });

    // Save the order to the database
    await order.save();

    res.status(201).json({ message: 'Order confirmed and saved to database!' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to confirm order', error: err });
  }
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
