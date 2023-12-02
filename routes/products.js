import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const category = req.query.category;
		const query = category ? { category } : {};

		const products = await Product.find(query);

		res.json(products);
	} catch (error) {
		console.error('Error querying the database:', error);
		res.status(500).send({ error: 'Internal Server Error' });
	}
});

router.get('/:id', async (req, res) => {
	const productId = req.params.id;

	try {
		const product = await Product.findById(productId);

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