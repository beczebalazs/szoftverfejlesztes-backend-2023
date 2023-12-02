import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
	const userId = req.params.id;

	try {
		const user = await User.findById(userId);

		if (!user) {
			res.status(404).json({ error: 'User not found' });
			return;
		}

		res.json(user);
	} catch (error) {
		console.error('Error querying the database:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

export default router;