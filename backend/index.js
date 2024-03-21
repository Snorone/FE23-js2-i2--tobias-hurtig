import express from "express";
import {body, validationResult } from "express-validator";
import { addTask, deleteTask, patchTask, getTasks } from "./fs.js";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "* ");

  next();
});

const postValidation = [
  body("category").exists().isIn(['ux', "dev backend", "dev frontend"]),
  body("task").exists().isString()
];

const patchValidation = [
  body("assign").exists().isString(),
  body("id").exists().isNumeric()
];

const patchDoneValidation = [
  body("id").exists().isNumeric()
];





app.get("/api/tasks", (req, res) => {
  getTasks().then((data) => {
    res.json(data);
  });
});
app.delete("/api/task/:id", (req, res) => {
  deleteTask(req.params.id).then((tasks) => {
    res.json(tasks);
  });
});
app.post("/api/task", postValidation, async(req, res) => {

  const errors = validationResult(req);
  if(errors.array().length > 0){
    res.status(400).json({message: "wrong format"});
  }
  else{
    await addTask(req.body).then((data) => {
    res.json(data);
  });
  }

  
});

app.patch("/api/task", (req, res) => {
  patchTask(req.body).then((data) => {
    res.json(data);
  });
});
app.patch("/api/task/done", (req, res) => {
  patchTask(req.body).then((data) => {
    res.json(data);
  });
});

app.listen(3000, () => {
  console.log("lyssnar på 3000");
});
