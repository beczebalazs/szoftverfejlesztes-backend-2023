import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


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
  };

  fs.writeFile('user.json', JSON.stringify(user), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error (Saving)');
    } else {
      res.status(200).send('User saved');
    }
  });
});


app.listen(3001, () => {
  console.log("Server is listening on port 3001");
});
