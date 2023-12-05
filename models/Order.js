import mongoose from 'mongoose';

const Order = mongoose.model(
    'Order',
    new mongoose.Schema({
        orderId: {
            type: String,
            default: function () {
                return new mongoose.Types.ObjectId().toHexString();
            },
        },
        userId: String,
        price: Number,
        products: [
            {
                id: String,
                quantity: Number,
            },
        ],
        firstName: String,
        lastName: String,
        email: String,
        street: String,
        country: String,
        city: String,
        zipCode: String,
        houseNumber: String,
        date: String,
    }),
);

export default Order;