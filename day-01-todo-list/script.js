// const input = document.getElementById("input-todo");
// const addBtn = document.getElementById("add-todo");
// const todoWrapper = document.querySelector(".todo-wrapper");

// let editId = null;

// function getTodos() {
//   return JSON.parse(localStorage.getItem("todos")) || [];
// }

// function saveTodos(todos) {
//   localStorage.setItem("todos", JSON.stringify(todos));
// }

// addBtn.addEventListener("click", () => {
//   const text = input.value.trim();
//   if (!text) return alert("Please enter a task");

//   let todos = getTodos();

//   if (editId) {
//     todos = todos.map((t) => (t.id === editId ? { ...t, text } : t));
//     saveTodos(todos);
//     location.reload();
//     return;
//   }

//   if (todos.some((t) => t.text.toLowerCase() === text.toLowerCase())) {
//     return alert("Task already exists");
//   }
//   const dueDate = new Date().toISOString().split("T")[0];
//   const todo = { id: Date.now(), text, completed: false,dueDate };
//   todos.push(todo);
//   saveTodos(todos);
//   createTodo(todo);
//   input.value = "";
// });

// function createTodo({ id, text, completed,dueDate }) {
//   const todo = document.createElement("div");
//   todo.className =
//     "todo flex items-center justify-between bg-white p-4 rounded";

//   const checkbox = document.createElement("input");
//   checkbox.type = "checkbox";
//   checkbox.checked = completed;

//   const para = document.createElement("p");
//   para.innerText = text;

//   if (completed) para.classList.add("line-through");
//   const dueDateInput = document.createElement("input");
//   dueDateInput.type = "date";
//   dueDateInput.value = dueDate;

//   const currentDay=new Date().toISOString().split("T")[0];
//   if(dueDate<currentDay && !completed){
//     para.classList.add("text-red-500");
//   }

//  dueDateInput.addEventListener("change", () => {
//   let todos = getTodos();
//   todos = todos.map((t) =>
//     t.id === id ? { ...t, dueDate: dueDateInput.value } : t
//   );
//   saveTodos(todos);
// });


//   checkbox.addEventListener("change", () => {
//     let todos = getTodos();
//     todos = todos.map((t) =>
//       t.id === id ? { ...t, completed: checkbox.checked } : t
//     );
//     saveTodos(todos);
//     para.classList.toggle("line-through", checkbox.checked);
//   });

//   const editBtn = document.createElement("button");
//   editBtn.innerText = "Edit";
//   editBtn.onclick = () => {
//     input.value = text;
//     editId = id;
    
//   };

//   const delBtn = document.createElement("button");
//   delBtn.innerText = "Delete";
//   delBtn.onclick = () => {
//     let todos = getTodos().filter((t) => t.id !== id);
//     saveTodos(todos);
//     todo.remove();
//   };

  
//   todo.append(checkbox, para, dueDateInput, editBtn, delBtn);
//   todoWrapper.appendChild(todo);



// window.addEventListener("DOMContentLoaded", () => {
//   getTodos().forEach(createTodo);
// });


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

// LOAD TODOS ON PAGE LOAD ✅
document.addEventListener("DOMContentLoaded", () => {
  getTodos().forEach(createTodo);
});

addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return alert("Please enter a task");

  let todos = getTodos();

  // EDIT TODO
  if (editId) {
    todos = todos.map((t) =>
      t.id === editId ? { ...t, text } : t
    );
    saveTodos(todos);
    todoWrapper.innerHTML = "";
    getTodos().forEach(createTodo);
    editId = null;
    input.value = "";
    return;
  }

  // DUPLICATE CHECK
  if (todos.some((t) => t.text.toLowerCase() === text.toLowerCase())) {
    return alert("Task already exists");
  }

  const dueDate = new Date().toISOString().split("T")[0];

  const todo = {
    id: Date.now(),
    text,
    completed: false,
    dueDate,
  };

  todos.push(todo);
  saveTodos(todos);
  createTodo(todo);
  input.value = "";
});

function createTodo({ id, text, completed, dueDate }) {
  const todo = document.createElement("div");
  todo.className =
    "todo flex items-center justify-between bg-white p-4 rounded";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;

  const para = document.createElement("p");
  para.innerText = text;
  if (completed) para.classList.add("line-through");

  const dueDateInput = document.createElement("input");
  dueDateInput.type = "date";
  dueDateInput.value = dueDate; // ✅ FIXED

  const currentDay = new Date().toISOString().split("T")[0];
  if (dueDate < currentDay && !completed) {
    para.classList.add("text-red-500");
  }

  dueDateInput.addEventListener("change", () => {
    let todos = getTodos();
    todos = todos.map((t) =>
      t.id === id ? { ...t, dueDate: dueDateInput.value } : t
    );
    saveTodos(todos);
  });

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
  };

  const delBtn = document.createElement("button");
  delBtn.innerText = "Delete";
  delBtn.onclick = () => {
    let todos = getTodos().filter((t) => t.id !== id);
    saveTodos(todos);
    todo.remove();
  };

  todo.append(checkbox, para, dueDateInput, editBtn, delBtn);
  todoWrapper.appendChild(todo);
}
