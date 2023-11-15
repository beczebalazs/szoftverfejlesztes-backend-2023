import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use((_, res) => {
  res.send({ message: 'Not found!' });
});

app.listen(3001, () => {
  console.log("Server is listening on port 3001");
});
