import fs from "fs/promises";

async function readDatabase() {
  const myDb = await fs.readFile("./db.json");
  console.log(myDb);
  return JSON.parse(myDb);
}

async function writeDatabase(tasks) {
  const db = { tasks };
  const done = await fs.writeFile("./db.json", JSON.stringify(db, null, 2));
  return done;
}

async function getTasks() {
  const db = await readDatabase();
  const { tasks } = db;
  if (tasks != null) {
    return tasks;
  } else {
    return [];
  }
}

async function addTask(task) {
  const newTask = { id: Date.now(), ...task };
  const tasks = await getTasks();
  tasks.push(newTask);
  await writeDatabase(tasks);
  return newTask;
}

async function addTasks(tasks) {
  await writeDatabase(tasks);
  return tasks;
}

async function deleteTask(id) {
  const tasks = await getTasks();
  const result = tasks.filter((tmpTask) => tmpTask.id != id);

  addTasks(result);
  return result;
}

async function patchTask(updatedTask) {
  const tasks = await getTasks();
  const result = tasks.filter((tmpTask) => tmpTask.id != updatedTask.id);
  result.push(updatedTask);
  addTasks(result);
  return result;
}
export { getTasks, addTask, deleteTask, patchTask };
