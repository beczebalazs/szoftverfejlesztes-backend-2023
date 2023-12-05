import express from 'express';
import mongoose from 'mongoose';
import Review from '../models/Review.js';

const router = express.Router();

router.use(express.json());

router.post('/', async (req, res) => {
  const { productId, username, description, rating, date} = req.body;

  try {
    const newReview = new Review({
      productId,
      username,
      description,
      rating,
      date,
    });

    const savedReview = await newReview.save();

    res.status(201).json(savedReview);
  } catch (error) {
    console.error('Error saving to the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:productId', async (req, res) => {
  const productId = req.params.productId;

  try {
    const reviews = await Review.find({ productId });

    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
