import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
 
const app = express();
const PORT = 3001;
 
const mongoURI =
	'mongodb+srv://lukacszsombor:YTFdfoJBFnl62vdW@cluster0.b0vu4xs.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
 
const connection = mongoose.connection;
connection.once('open', () => {
	console.log('MongoDB connection established successfully');
});
 
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
 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
 
app.get('/home', (req, res) => {
	res.send({ message: 'Welcome to the homepage!' });
});
 
app.post('/sign-in', async (req, res) => {
	const { email, password } = req.body;
 
	try {
		const foundUser = await User.findOne({ email });
 
		if (!foundUser) {
			res.status(404).send('User not found');
			return;
		}
 
		if (foundUser.password !== password) {
			res.status(401).send('Invalid password');
			return;
		}
 
		res.status(200).json({ message: 'Login successful', user: foundUser });
	} catch (error) {
		console.error(error);
		res.status(500).send('Error querying the database');
	}
});
 
app.get('/products', (req, res) => {
	const filePath = path.join(__dirname, 'src/products.json');
 
	fs.readFile(filePath, 'utf8', (err, data) => {
		if (err) {
			console.error('Error reading products.json:', err);
			res.status(500).send({ error: 'Internal Server Error' });
			return;
		}
 
		try {
			let products = JSON.parse(data);
 
			const category = req.query.category;
			if (category) {
				products = products.filter(product => product.category === category);
			}
 
			res.json(products);
		} catch (parseError) {
			console.error('Error parsing products.json:', parseError);
			res.status(500).send({ error: 'Internal Server Error' });
		}
	});
});
 
app.post('/sign-up', async (req, res) => {
	const { firstName, lastName, username, email, password, role } = req.body;
 
	const userRole = role || 'member';
 
	const newUser = new User({
		firstName,
		lastName,
		username,
		email,
		password,
		role: userRole,
	});
 
	try {
		const savedUser = await newUser.save();
		res.status(200).json({ message: 'User registered', user: savedUser });
	} catch (error) {
		console.error(error);
		res.status(500).send('Error saving to the database');
	}
});
 
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});