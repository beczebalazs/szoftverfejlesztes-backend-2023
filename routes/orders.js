import express from 'express';
import Order from '../models/Order.js';
import mongoose from 'mongoose';

const router = express.Router();

router.post('/order', async (req, res) => {
  try {
    const {
      userId,
      price,
      products,
      firstName,
      lastName,
      email,
      street,
      country,
      city,
      zipCode,
      houseNumber,
      date,
    } = req.body;

    
    const newOrder = new Order({
      order_id: new mongoose.Types.ObjectId().toHexString(),
      userId,
      price,
      products,
      firstName,
      lastName,
      email,
      street,
      country,
      city,
      zipCode,
      houseNumber,
      date,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
