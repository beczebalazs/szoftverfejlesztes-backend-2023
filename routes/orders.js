import express from 'express';
import Order from '../models/Order.js';
import mongoose from 'mongoose';

const router = express.Router();

router.post('/order', async (req, res) => {
  try {
    const {
      user_id,
      price,
      products,
      first_name,
      last_name,
      email,
      street,
      country,
      city,
      zip_code,
      house_number,
    } = req.body;

    
    const newOrder = new Order({
      order_id: new mongoose.Types.ObjectId().toHexString(),
      user_id,
      price,
      products,
      first_name,
      last_name,
      email,
      street,
      country,
      city,
      zip_code,
      house_number,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
