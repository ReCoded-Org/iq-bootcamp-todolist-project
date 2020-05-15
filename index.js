function addingToDo(event) {
  let todoText = document.getElementById("todo-input").value;
  let todoDate = document.getElementById("due-date-input").value;

  let todoObj = {
    text: todoText,
    date: todoDate,
  };

  let li = document.createElement("li");
  let todoDiv = document.createElement("div");
  let textDiv = document.createElement("div");
  let textNode = document.createTextNode(todoObj.text);
  let deadlineDiv = document.createElement("div");
  let deadlineNode = document.createTextNode(todoObj.date);
  textDiv.appendChild(textNode);
  deadlineDiv.appendChild(deadlineNode);
  deadlineDiv.setAttribute("class", "deadline-display");
  todoDiv.appendChild(textDiv);
  todoDiv.appendChild(deadlineDiv);
  li.appendChild(todoDiv);
  todoUl.appendChild(li);

  event.preventDefault();
}

let todoArray = [];
const todaysDate = document.getElementById("todays-date");
const todoUl = document.querySelector("ul#todo-list");
const form = document.getElementById("form");

let currentDate = new Date();
let cleanDate =
  currentDate.getDate() +
  "/" +
  (currentDate.getMonth() + 1) +
  "/" +
  currentDate.getFullYear();
todaysDate.innerText = cleanDate;

form.addEventListener("submit", addingToDo);
