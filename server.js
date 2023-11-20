import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const generateAccessToken = (userId) => {
  const secretKey = 'our-secret-key'; 
  const expiresIn = '12h';

  return jwt.sign({ userId }, secretKey, { expiresIn });
};


const mongoURI = "mongodb+srv://lukacszsombor:YTFdfoJBFnl62vdW@cluster0.b0vu4xs.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoURI);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/home", (req, res) => {
  res.send({ message: 'Welcome to the homepage!' });
});


app.get("/products", (req, res) => {
  const filePath = path.join(__dirname, "src/products.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading products.json:", err);
      res.status(500).send({ error: "Internal Server Error" });
      return;
    }

    try {
      const products = JSON.parse(data);
      res.json(products);
    } catch (parseError) {
      console.error("Error parsing products.json:", parseError);
      res.status(500).send({ error: "Internal Server Error" });
    }
  });
});

app.post('/sign-up', (req, res) => {
  const { firstName, lastName, username, email, password, role } = req.body;

  const encodedPassword = Buffer.from(password).toString('base64');

  const userRole = role || 'member';

  const user = {
    firstName,
    lastName,
    username,
    email,
    password: encodedPassword,
    role: userRole,
    access_token: generateAccessToken(email),
  };

  fs.writeFile('user.json', JSON.stringify(user), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error (Saving)');
    } else {
      res.status(200).json({ message: 'User registered', access_token: user.access_token });
    }
  });
});

app.post('/sign-in', (req, res) => {
  const { email, password } = req.body;

  fs.readFile('user.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error (Reading)');
      return;
    }

    try {
      const users = JSON.parse(data);

      const foundUser = users.find((user) => user.email === email);

      if (!foundUser) {
        res.status(404).send('User not found');
        return;
      }

      const decodedPassword = Buffer.from(password, 'base64').toString('utf8');
      if (foundUser.password !== decodedPassword) {
        res.status(401).send('Invalid password');
        return;
      }

      const access_token = generateAccessToken(foundUser.email);

      res.status(200).json({ message: 'Login successful', access_token: access_token });
    } catch (jsonError) {
      console.error(jsonError);
      res.status(500).send('Error (Parsing JSON)');
    }
  });
});



app.listen(3001, () => {
  console.log("Server is listening on port 3001");
});
