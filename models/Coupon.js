import mongoose from 'mongoose';

const Coupon = mongoose.model(
	'Coupon',
	new mongoose.Schema({
		name: String,
		value: Number,
	}),
);

export default Coupon;