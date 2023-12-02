import express from 'express';
import Coupon from '../models/Coupon.js';

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const coupons = await Coupon.find();
		res.json(coupons);
	} catch (error) {
		console.error('Error querying the database:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

export default router;