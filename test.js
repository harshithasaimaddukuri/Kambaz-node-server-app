import express from "express";
const app = express();

app.get("/lab5/add/:a/:b", (req, res) => {
  res.send("Result is: " + (parseInt(req.params.a) + parseInt(req.params.b)));
});

app.listen(4000);
console.log("Open: http://localhost:4000/lab5/add/5/10");
