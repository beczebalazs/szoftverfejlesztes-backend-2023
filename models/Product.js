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
  rating: Number,
});


const Product = mongoose.model('Product', ProductSchema);

export default Product;
