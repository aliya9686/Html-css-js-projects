const input=document.getElementById("input-todo");
const addBtn=document.getElementById("add-todo");
const todoWrapper=document.querySelector(".todo-wrapper");

addBtn.addEventListener("click",function(){
    let text=input.value;
    if(text===""){
        return;

    }
    let todo=document.createElement("div");
    todo.className="todo bg-white flex justify-between items-center text-2xl p-4 rounded shadow-md";

    let para=document.createElement("p");
    para.innerText=text;


    let delBtn=document.createElement("button");
    delBtn.innerText="Delete";
    delBtn.className="bg-red-500 text-white px-3 py-1 rounded";


    delBtn.addEventListener("click",function(){
        todo.remove();
    });


    todo.appendChild(para);
    todo.appendChild(delBtn);



    todoWrapper.appendChild(todo);

    input.value="";

})