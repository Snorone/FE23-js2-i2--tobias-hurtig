import {
  getTasks,
  postWithForm,
  deleteTask,
  patchTask,
} from "./modules/fetchFunctions.js";

import displayTasks from "./modules/displayTasks.js";
const tasksDiv = document.querySelector("#todo");
const form = document.querySelector("#mainform");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formInput = document.querySelector("#forminput");

  let userSelect = document.querySelector("select").value;
  const userInput = document.querySelector("input").value;

  postWithForm(userInput, userSelect).then(() => {
    getTasks().then(displayTasks);
    formInput.value = "";
  });
});

getTasks().then(displayTasks);
