import { getTasks, deleteTask, patchTask } from "./fetchFunctions.js";
const todoContainer = document.querySelector("#tododiv");
const inProgressContainer = document.querySelector("#in-progressdiv");
const doneContainer = document.querySelector("#donediv");

export default function displayTasks(tasks) {
  todoContainer.innerHTML = "";
  inProgressContainer.innerHTML = "";
  doneContainer.innerHTML = "";

  tasks.forEach((task) => {
    if (task.id != null) {
      displayTask(task);
    }
  });
}

function displayTask(taskObj) {
  if (taskObj.status == "to do") {
    const taskCard = createAndAppend("div", todoContainer);
    if (taskObj.category == "ux") {
      taskCard.className = "divclassux";
    } else if (taskObj.category == "dev backend") {
      taskCard.className = "divclassbackend";
    } else {
      taskCard.className = "divclassfrontend";
    }
    const taskH3 = createAndAppend("p", taskCard, taskObj.task);
    createForm(taskCard, taskObj);
  } else if (taskObj.status == "in progress") {
    const taskCard = createAndAppend("div", inProgressContainer);
    if (taskObj.category == "ux") {
      taskCard.className = "divclassux";
    } else if (taskObj.category == "dev backend") {
      taskCard.className = "divclassbackend";
    } else {
      taskCard.className = "divclassfrontend";
    }
    const taskH3 = createAndAppend("p", taskCard, taskObj.task);
    const assName = createAndAppend("p", taskCard, taskObj.assigned);
    const doneBtn = createDoneBtn(taskCard, taskObj, taskObj.assigned, "done");
    assName.className = "ass-name";
  } else {
    const taskCard = createAndAppend("div", doneContainer);
    if (taskObj.category == "ux") {
      taskCard.className = "divclassux";
    } else if (taskObj.category == "dev backend") {
      taskCard.className = "divclassbackend";
    } else {
      taskCard.className = "divclassfrontend";
    }
    const taskH3 = createAndAppend("p", taskCard, taskObj.task);
    const assName = createAndAppend("p", taskCard, taskObj.assigned);
    const delBtn = createDeleteBtn(taskCard, taskObj.id);
  }
}

function createAndAppend(type, container, content) {
  const el = document.createElement(type);
  if (type != "div") el.innerText = content;
  container.append(el);
  return el;
}

function createForm(div, task) {
  let elForm = document.createElement("form");
  let inputForm = document.createElement("input");
  let elBtn = document.createElement("button");

  inputForm.type = "text";
  inputForm.placeholder = "Name";
  inputForm.required = true;
  elBtn.className = "buttonclass";
  elBtn.innerText = "Assign";

  elForm.append(inputForm);
  elForm.append(elBtn);
  div.append(elForm);

  elForm.addEventListener("submit", (event) => {
    event.preventDefault();
    patchTask(task, inputForm.value, "in progress")
    .then(getTasks)
    .then(displayTasks);
  });
}

function createDeleteBtn(div, id) {
  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete X";
  deleteBtn.className = "buttonclass";
  div.append(deleteBtn);

  deleteBtn.addEventListener("click", (event) => {
    event.preventDefault();
    deleteTask(id).then(() => {
      getTasks().then(displayTasks);
    });
  });
}

function createDoneBtn(div, task, assignedVal, assignedStatus) {
  let doneBtn = document.createElement("button");
  doneBtn.innerText = "Done";
  doneBtn.className = "buttonclass";
  div.append(doneBtn);

  doneBtn.addEventListener("click", (event) => {
    event.preventDefault();
    patchTask(task, assignedVal, assignedStatus).then(() => {
      getTasks().then(displayTasks);
    });
  });
}
