import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import homeRouter from './routes/home.js';
import signInRouter from './routes/signIn.js';
import productsRouter from './routes/products.js';
import signUpRouter from './routes/signUp.js';
import userRouter from './routes/user.js';
import couponRouter from './routes/coupons.js';
import reviewRouter from './routes/reviews.js';
import orderRouter from './routes/orders.js';

const app = express();
const PORT = 3001;

const mongoURI =
	'mongodb+srv://lukacszsombor:YTFdfoJBFnl62vdW@cluster0.b0vu4xs.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
	console.log('MongoDB connection established successfully');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/home', homeRouter);
app.use('/sign-in', signInRouter);
app.use('/products', productsRouter);
app.use('/sign-up', signUpRouter);
app.use('/user', userRouter);
app.use('/coupons', couponRouter);
app.use('/review', reviewRouter);
app.use('/order', orderRouter);

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});