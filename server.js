import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

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

app.listen(3001, () => {
  console.log("Server is listening on port 3001");
});
