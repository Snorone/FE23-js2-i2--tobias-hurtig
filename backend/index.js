import express from "express";
import { addTask, deleteTask, patchTask, getTasks } from "./fs.js";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "* ");

  next();
});

app.get("/api/tasks", (req, res) => {
  getTasks().then((data) => {
    res.json(data);
  });
});
app.delete("/api/task/:id", (req, res) => {
  console.log(req.params.id);
  deleteTask(req.params.id).then((tasks) => {
    res.json(tasks);
  });
});
app.post("/api/task", (req, res) => {
  addTask(req.body).then((data) => {
    res.json(data);
  });
});

app.patch("/api/task", (req, res) => {
  patchTask(req.body).then((data) => {
    res.json(data);
  });
});

app.listen(3000, () => {
  console.log("lyssnar på 3000");
});
