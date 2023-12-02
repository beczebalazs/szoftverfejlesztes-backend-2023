import express from 'express';
import bcrypt from 'bcrypt';
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

		const passwordMatch = await bcrypt.compare(password, foundUser.password);

		if (!passwordMatch) {
			res.status(401).send('Invalid password');
			return;
		}

		res.status(200).json({ user_id: foundUser._id });
	} catch (error) {
		console.error(error);
		res.status(500).send('Error querying the database');
	}
});

export default router;

