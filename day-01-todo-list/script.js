const input = document.getElementById("input-todo");
const addBtn = document.getElementById("add-todo");
const todoWrapper = document.querySelector(".todo-wrapper");
let editPara = null;
addBtn.addEventListener("click", function () {
  let text = input.value.trim();

  if (text === "") {
    alert("Please enter a task!!");
    return;
  }



  if (editPara != null) {
    editPara.innerText = text;
    editPara = null;
    addBtn.innerText = "Add";
    input.value = "";
    return;
  }

  let todo = document.createElement("div");
  todo.className =
    "todo bg-white flex justify-between items-center text-2xl p-4 rounded shadow-md";

  let para = document.createElement("p");
  para.innerText = text;

  const allTasks=document.querySelectorAll(".todo p");
  for(let todo of allTasks){

  
    if(todo.innerText.toLocaleLowerCase()===text.toLowerCase()){
      alert("This task already exists!");
      return;
    }
  }


  let delBtn = document.createElement("button");
  delBtn.innerText = "Delete";
  delBtn.className = "bg-red-500 text-white px-3 py-1 rounded";

  delBtn.addEventListener("click", function () {
    todo.remove();
  });

  let editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.className = "bg-red-500 text-white px-3 py-1 rounded";

  editBtn.addEventListener("click", function () {
    input.value = para.innerText;
    editPara = para;
  });

  todo.appendChild(para);
  todo.appendChild(delBtn);
  todo.appendChild(editBtn);

  todoWrapper.appendChild(todo);

  input.value = "";
});
