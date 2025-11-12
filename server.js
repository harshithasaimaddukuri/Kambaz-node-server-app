import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server works!");
});

app.get("/lab5/add/:a/:b", (req, res) => {
  const { a, b } = req.params;
  const sum = parseInt(a) + parseInt(b);
  res.send(sum.toString());
});

app.listen(4000, () => {
  console.log("Server on 4000");
  console.log("Test: http://localhost:4000/lab5/add/5/10");
});
