const input = document.getElementById("input-todo");
const addBtn = document.getElementById("add-todo");
const todoWrapper = document.querySelector(".todo-wrapper");

let editId = null;

function getTodos() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}

function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return alert("Please enter a task");

  let todos = getTodos();

  if (editId) {
    todos = todos.map((t) => (t.id === editId ? { ...t, text } : t));
    saveTodos(todos);
    location.reload();
    return;
  }

  if (todos.some((t) => t.text.toLowerCase() === text.toLowerCase())) {
    return alert("Task already exists");
  }

  const todo = { id: Date.now(), text, completed: false };
  todos.push(todo);
  saveTodos(todos);
  createTodo(todo);
  input.value = "";
});

function createTodo({ id, text, completed }) {
  const todo = document.createElement("div");
  todo.className =
    "todo flex items-center justify-between bg-white p-4 rounded";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;

  const para = document.createElement("p");
  para.innerText = text;

  if (completed) para.classList.add("line-through");

  checkbox.addEventListener("change", () => {
    let todos = getTodos();
    todos = todos.map((t) =>
      t.id === id ? { ...t, completed: checkbox.checked } : t
    );
    saveTodos(todos);
    para.classList.toggle("line-through", checkbox.checked);
  });

  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.onclick = () => {
    input.value = text;
    editId = id;
    addBtn.innerText = "Add";
  };

  const delBtn = document.createElement("button");
  delBtn.innerText = "Delete";
  delBtn.onclick = () => {
    let todos = getTodos().filter((t) => t.id !== id);
    saveTodos(todos);
    todo.remove();
  };

  const dueDateInput = document.createElement("input");
  dueDateInput.type = "date";
  dueDateInput.id = "due-date";

  todo.append(checkbox, para, editBtn, delBtn, dueDateInput);
  todoWrapper.appendChild(todo);
}

window.addEventListener("DOMContentLoaded", () => {
  getTodos().forEach(createTodo);
});
