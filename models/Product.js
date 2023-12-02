import mongoose from 'mongoose';

const Product = mongoose.model(
	'Product',
	new mongoose.Schema({
		image: String,
		title: String,
		price: Number,
		rating: Number,
		category: String,
		brand: String,
	}),
);

export default Product;