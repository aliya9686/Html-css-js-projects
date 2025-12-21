// const input = document.getElementById("input-todo");
// const addBtn = document.getElementById("add-todo");
// const todoWrapper = document.querySelector(".todo-wrapper");
// let editPara = null;


// function getTodos() {
//   return JSON.parse(localStorage.getItem("todos")) || [];
// }
// function saveTodos(todos) {
//   localStorage.setItem("todos", JSON.stringify(todos));
// }

// addBtn.addEventListener("click", function () {
//   let text = input.value.trim();

//   if (text === "") {
//     alert("Please enter a task!!");
//     return;
//   }

//   if (editPara != null) {
//     let todos=getTodos();
//     todos=todos.map(t=>t.text===editPara.innerText?{...t,text}:t);
//     saveTodos(todos);
//     editPara.innerText = text;
//     editPara = null;
//     addBtn.innerText = "Add";
//     input.value = "";
//     return;
//   }
//    let todos = getTodos();
//   todos.push({ text: text, completed: false });
//   saveTodos(todos);

// function createTodo(text, completed = false) {
//   let todo = document.createElement("div")
//   todo.className =
//     "todo bg-white flex justify-between items-center text-2xl p-4 rounded shadow-md";

//   let para = document.createElement("p");
//   para.innerText = text;

//   const allTasks = document.querySelectorAll(".todo p");
//   for (let todo of allTasks) {
//     if (todo.innerText.toLocaleLowerCase() === text.toLowerCase()) {
//       alert("This task already exists!");
//       return;
//     }
//   }
// }
 

//   let checkbox = document.createElement("input");
//   checkbox.type = "checkbox";

//   checkbox.addEventListener("change", function () {
//     let todos = getTodos();
//     todos = todos.map((t) =>
//       t.text === para.innerText ? { ...t, completed: checkbox.checked } : t
//     );

//     saveTodos(todos);
//     if (checkbox.checked) {
//       para.classList.add("line-through", "text-gray-400");
//     } else {
//       para.classList.remove("line-through", "text-gray-400");
//     }
//   });

//   let delBtn = document.createElement("button");
//   delBtn.innerText = "Delete";
//   delBtn.className = "bg-red-500 text-white px-3 py-1 rounded";

//  delBtn.addEventListener("click", function () {
//   let todos = getTodos();
//   todos = todos.filter(t => t.text !== para.innerText);
//   saveTodos(todos);
//   todo.remove();
// });


//   let editBtn = document.createElement("button");
//   editBtn.innerText = "Edit";
//   editBtn.className = "bg-red-500 text-white px-3 py-1 rounded";

//   editBtn.addEventListener("click", function () {
//     input.value = para.innerText;
//     editPara = para;
//   });

//   todo.appendChild(para);
//   todo.appendChild(delBtn);
//   todo.appendChild(editBtn);
//   todo.appendChild(checkbox);

//   todoWrapper.appendChild(todo);

//   window.addEventListener("DOMContentLoaded", function () {
//     let todos = getTodos();
//     todos.forEach((todo) => {
//       createTodo(todo.text, todo.completed);
//     });
//   });


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
    todos = todos.map(t =>
      t.id === editId ? { ...t, text } : t
    );
    saveTodos(todos);
    location.reload();
    return;
  }

  if (todos.some(t => t.text.toLowerCase() === text.toLowerCase())) {
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
  todo.className = "todo flex items-center justify-between bg-white p-4 rounded";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;

  const para = document.createElement("p");
  para.innerText = text;

  if (completed) para.classList.add("line-through");

  checkbox.addEventListener("change", () => {
    let todos = getTodos();
    todos = todos.map(t =>
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
    let todos = getTodos().filter(t => t.id !== id);
    saveTodos(todos);
    todo.remove();
  };

  todo.append(checkbox, para, editBtn, delBtn);
  todoWrapper.appendChild(todo);
}

window.addEventListener("DOMContentLoaded", () => {
  getTodos().forEach(createTodo);
});
