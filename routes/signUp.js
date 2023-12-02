import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/', async (req, res) => {
	const { firstName, lastName, username, email, password, role } = req.body;

	const userRole = role || 'member';

	const newUser = new User({
		firstName,
		lastName,
		username,
		email,
		password,
		role: userRole,
	});

	try {
		const savedUser = await newUser.save();
		res.status(200).json({ message: 'User registered', user: savedUser });
	} catch (error) {
		console.error(error);
		res.status(500).send('Error saving to the database');
	}
});

export default router;