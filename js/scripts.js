// Seleção de elementos
const btnAddTask = document.querySelector(".main-input button");
const inputTask = document.querySelector(".main-input input");
const mainInput = document.querySelector(".main-input");
const btnTrash = document.querySelector("#bin");
const btnCompleted = document.querySelector("#completed");
const taskModalMain = document.querySelector("#container-task1");
const taskModalCompleted = document.querySelector("#container-task2");
const taskModalTrash = document.querySelector("#container-task3");
const title = document.querySelector(".container-menu h1");

let tasks = [];
let tasksComplete = [];
let tasksTrash = [];

// Funções
function addTask(task) {
  if (task) {
    tasks.push(task);
    inputTask.value = "";
  } else {
    return;
  }

  updateTask();
}

function updateTask() {
  taskModalMain.innerHTML = "";

  tasks.forEach((item, index) => {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task");

    taskItem.innerHTML = `<i data-index="${index}" id="i-correct" class="fa-solid fa-check" style="color: #00a876"></i>
                          <p class="task-text">${item}</p>
                          <i id="i-x" data-modal="main" class="fa-solid fa-xmark" style="color: #ff0000"></i>`;

    taskModalMain.appendChild(taskItem);
  });

  iconC();
  iconX();
}

function iconC() {
  const iconCompleted = document.querySelectorAll("#i-correct");

  iconCompleted.forEach((element) => {
    element.addEventListener("click", (event) => {
      const index = Number(event.target.getAttribute("data-index"));
      const item = tasks[index];

      if (item) {
        tasks.splice(index, 1);
        tasksComplete.push(item);
      }
      updateTask();
    });
  });
}

function iconX() {
  const iconX = document.querySelectorAll("#i-x");

  iconX.forEach((element) => {
    const newElement = element.cloneNode(true);
    element.replaceWith(newElement);

    newElement.addEventListener("click", (event) => {
      const index = Number(event.target.getAttribute("data-index"));
      const modal = event.target.getAttribute("data-modal");
      let item;

      if (modal === "main") {
        item = tasks[index];
        if (item) {
          tasks.splice(index, 1);
          tasksTrash.push(item);
        }
      } else if (modal === "completed") {
        item = tasksComplete[index];
        if (item) {
          tasksComplete.splice(index, 1);
          tasksTrash.push(item);
        }
      } else if (modal === "trash") {
        item = tasksTrash[index];
        if (item) {
          tasksTrash.splice(index, 1);
        }
      }
      updateTask();
      listCompleted();
      listTrash();
    });
  });
}

function listCompleted() {
  taskModalCompleted.innerHTML = "";

  tasksComplete.forEach((item, index) => {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task");
    taskItem.style.backgroundColor = "#00a876";
    taskItem.style.color = "#ffffff";

    taskItem.innerHTML = `<p></p>
                          <p class="task-text">${item}</p>
                          <i data-index="${index}" data-modal="completed" id="i-x" class="fa-solid fa-xmark" style="color: #ffffff"></i>`;

    taskModalCompleted.appendChild(taskItem);
  });

  iconX();
}

function listTrash() {
  taskModalTrash.innerHTML = "";
  tasksTrash.forEach((item, index) => {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task");
    taskItem.style.backgroundColor = "#ff0000";
    taskItem.style.color = "#ffffff";

    taskItem.innerHTML = `<p></p>
                          <p class="task-text">${item}</p>
                          <i data-index="${index}" data-modal="trash" id="i-x" class="fa-solid fa-xmark" style="color: #ffffff"></i>`;

    taskModalTrash.appendChild(taskItem);
  });

  iconX();
}

// Eventos
btnAddTask.addEventListener("click", () => {
  const myTask = inputTask.value;

  addTask(myTask);
});

btnCompleted.addEventListener("click", () => {
  mainInput.style.display = "none";
  taskModalMain.style.display = "none";
  taskModalTrash.style.display = "none";
  taskModalCompleted.style.display = "block";

  listCompleted();
});

btnTrash.addEventListener("click", () => {
  mainInput.style.display = "none";
  taskModalMain.style.display = "none";
  taskModalTrash.style.display = "block";
  taskModalCompleted.style.display = "none";

  listTrash();
});

title.addEventListener("click", () => {
  mainInput.style.display = "block";
  taskModalMain.style.display = "block";
  taskModalTrash.style.display = "none";
  taskModalCompleted.style.display = "none";
});
