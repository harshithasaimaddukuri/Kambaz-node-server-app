import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server works!");
});

app.get("/lab5/welcome", (req, res) => {
  res.send("Welcome to Lab 5");
});

app.get("/lab5/add/:a/:b", (req, res) => {
  const sum = parseInt(req.params.a) + parseInt(req.params.b);
  res.send(sum.toString());
});

app.listen(4000, () => {
  console.log("Server on port 4000");
});
