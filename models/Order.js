import mongoose from 'mongoose';

const Order = mongoose.model(
    'Order',
    new mongoose.Schema({
        order_id: {
            type: String,
            default: function () {
                return new mongoose.Types.ObjectId().toHexString();
            },
        },
        user_id: String,
        price: Number,
        products: [
            {
                id: String,
                quantity: Number,
            },
        ],
        first_name: String,
        last_name: String,
        email: String,
        street: String,
        country: String,
        city: String,
        zip_code: String,
        house_number: String,
        date: String,
    }),
);

export default Order;