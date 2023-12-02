import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
	res.send({ message: 'Welcome to the homepage!' });
});

export default router;