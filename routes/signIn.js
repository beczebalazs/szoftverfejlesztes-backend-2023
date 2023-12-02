import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/', async (req, res) => {
	const { email, password } = req.body;

	try {
		const foundUser = await User.findOne({ email });

		if (!foundUser) {
			res.status(404).send('User not found');
			return;
		}

		if (foundUser.password !== password) {
			res.status(401).send('Invalid password');
			return;
		}

		res.status(200).json({ message: 'Login successful', user_id: foundUser._id });
	} catch (error) {
		console.error(error);
		res.status(500).send('Error querying the database');
	}
});

export default router;