import mongoose from 'mongoose';

const Review = mongoose.model(
    'Review',
    new mongoose.Schema({
        productId: mongoose.Schema.Types.ObjectId,
        username: String,
        description: String,
        rating: {
            type: Number,
            min: 1,
            max: 5,
        },
        date: String,
    }),
);

export default Review;