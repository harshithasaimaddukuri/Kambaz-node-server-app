import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.get("/lab5/welcome", (req, res) => res.send("Welcome to Lab 5"));
app.get("/lab5/todos", (req, res) => res.json([{id:1,title:"Test"}]));
app.get("/lab5/add/:a/:b", (req, res) => {
  const sum = parseInt(req.params.a) + parseInt(req.params.b);
  res.send(sum.toString());
});
app.listen(4000, () => console.log("Server on 4000"));
