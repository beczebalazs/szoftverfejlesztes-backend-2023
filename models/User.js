import mongoose from 'mongoose';

const User = mongoose.model(
	'User',
	new mongoose.Schema({
		firstName: String,
		lastName: String,
		username: String,
		email: String,
		password: String,
		role: String,
	}),
);

export default User;