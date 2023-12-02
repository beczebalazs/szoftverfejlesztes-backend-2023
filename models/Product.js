import mongoose from 'mongoose';

const Product = mongoose.model(
	'Product',
	new mongoose.Schema({
		images: [String],
		title: String,
		price: Number,
		rating: Number,
		category: String,
		brand: String,
		shortDescription: String,
		longDescription: String,
	}),
);

export default Product;

