import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.get("/lab5/welcome", (req, res) => {
  res.send("Welcome to Lab 5");
});

app.get("/lab5/todos", (req, res) => {
  res.json([
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true }
  ]);
});

app.listen(4000, () => {
  console.log("Test server running on port 4000");
});
