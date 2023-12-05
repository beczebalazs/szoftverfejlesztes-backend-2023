import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

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

router.patch('/:id', async (req, res) => {
    const userId = req.params.id;
    const { first_name, last_name, username, email, password, oldPassword } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        if (password) {
            if (!oldPassword) {
                return res.status(400).json({ error: 'Old password is required for password change.' });
            }

            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ error: 'Old password is incorrect.' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        if (first_name) user.first_name = first_name;
        if (last_name) user.last_name = last_name;
        if (username) user.username = username;
        if (email) user.email = email;

        await user.save();

        res.json(user);
    } catch (error) {
        console.error('Error updating the user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;