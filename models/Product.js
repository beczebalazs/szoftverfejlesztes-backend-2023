import mongoose from 'mongoose';
import Review from './Review.js';

const ProductSchema = new mongoose.Schema({
	images: [String],
	title: String,
	price: Number,
	rating: Number,
	category: String,
	brand: String,
	shortDescription: String,
	longDescription: String,
	averageRating: Number,
});

ProductSchema.pre('save', async function (next) {
	try {
		const reviews = await Review.find({ productId: this._id });
		const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
		this.averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
		this.rating = this.averageRating;
		next();
	  } catch (error) {
		console.error('Error calculating average rating:', error);
		next(error);
	  }
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;

