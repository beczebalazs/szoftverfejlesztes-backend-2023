import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};

    const projection = {
      title: 1,
      brand: 1,
      rating: 1,
      images: { $slice: 1 },
      price: 1,
      category: 1,
    };

    const products = await Product.find(query).select(projection);
    res.json(products);
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const projection = {
      title: 1,
      brand: 1,
      rating: 1,
      images: 1,
      price: 1,
      category: 1,
      shortDescription: 1,
      longDescription: 1,
    };

    const product = await Product.findById(productId).select(projection);

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    res.json(product);
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
