export { getTasks, postWithForm, deleteTask, patchTask };

const baseUrl = "http://localhost:3000/api/";
const header = {
  "Content-type": "application/json; charset=UTF-8",
};

async function getTasks() {
  try {
    const url = baseUrl + "tasks";
    const options = {
      method: "GET",
      headers: header,
    };
    const res = await fetch(url, options);

    const tasks = await res.json();

    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
}

async function postWithForm(newTaskText, typeOfCategory) {
  const url = baseUrl + "task";
  const content = {
    assigned: "",
    category: typeOfCategory,
    status: "to do",
    task: newTaskText,
  };
  const options = {
    method: "POST",
    body: JSON.stringify(content),
    headers: header,
  };

  const res = await fetch(url, options);
  const data = await res.json();

}

async function patchTask(task, assigned, status) {
  const url = baseUrl + "task";

  const content = {
    id: task.id,
    assigned: assigned,
    category: task.category,
    status: status,
    task: task.task,
  };

  const options = {
    method: "PATCH",
    body: JSON.stringify(content),
    headers: header,
  };

  const res = await fetch(url, options);
  const data = await res.json();

  console.log(data);
}

async function deleteTask(id) {
  const url = baseUrl + "task/" + id;
  const options = {
    method: "DELETE",
  };

  const res = await fetch(url, options);
  const info = await res.json();

  console.log(info);
}
