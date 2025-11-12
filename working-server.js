const express = require("express");
const app = express();

app.get("/test", (req, res) => {
  res.send("Test works");
});

app.get("/lab5/add/:a/:b", (req, res) => {
  const a = req.params.a;
  const b = req.params.b;
  const sum = Number(a) + Number(b);
  res.send("Result: " + sum);
});

app.listen(4000, () => {
  console.log("Server started on 4000");
});
