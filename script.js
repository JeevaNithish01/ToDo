function print(VaLuE) {
  return console.log(VaLuE);
}

function id(vAlUe) {
  return document.getElementById(vAlUe);
}
function qs(value) {
  return document.querySelector(value);
}

function qsa(value) {
  return document.querySelectorAll(value);
}

// function eleByClass(className) {
//   return document.getElementsByClassName(className);
// }

function getFromStorage(){
  if (localStorage["tasks"]){
      return JSON.parse(localStorage.getItem("tasks"));
  }
  return [];
}

console.log(getFromStorage());

let tasks = [];
tasks = getFromStorage();
let idNo = (tasks.length >= 1) ? tasks[tasks.length - 1].id + 1 : 0;
let input = qs("#input");
qs(".add").addEventListener("click", addTasksToList);

function addTasksToList() {
  if (input.value == "") {
    qs("#err-msg").style.opacity = "1";
  }
  else {
    qs("#err-msg").style.opacity = "0";
    tasks.push({
      task: input.value,
      done: "Pending",
      id: idNo++
    });
    input.value = "";
    renderInUI();
    action();
  }
  localStorage.setItem('tasks', JSON.stringify(tasks)); 
}

function renderInUI() {
  let a = "";
  for (let i = 0; i < tasks.length; i++) {
    a += `<div id="${tasks[i].id}" class="b bg${tasks[i].id}">
        <div class="first">
            <input id="${tasks[i].id}" class="editInput" type="text" readonly value="${tasks[i].task}">
        </div>
        <br><br>
        <div class="actionButtons">
            <button class="primaryButtons edit">Edit</button>
            <button class="primaryButtons save">Save</button>
            <button class="del">Delete</button>
            <button class="completed">Finished</button>
        </div>
    </div>`;
  }
  qs(".list").innerHTML = a;
  changeBG();
}

function deleteTask(id) {
  let isDelete = confirm("Are you sure you want to delete this task?");
  if(isDelete) {
    deleteFinder(id);
    renderInUI();
    action();
  }
}

function deleteFinder(id) {
  for(let i=0; i<tasks.length; i++){
    if(tasks[i].id == id){
      tasks.splice(i,1);
      break;
    }
  }
  localStorage.setItem('tasks', JSON.stringify(tasks)); 
}

// function completeFinder(id) {
//   for (let i = 0; i < tasks.length; i++) {
//     if (tasks[i].id == id) {
//       tasks[i].done = "Finished";
//       break;
//     }
//   }
// }

function completeFinder(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == id) {
      tasks[i].done = tasks[i].done == "Pending" ? "Finished" : "Pending";
      // print(tasks[i].done);
      break;
    }
  }
}

function completeTask(id) {
  completeFinder(id);
  renderInUI();
  action();
  localStorage.setItem('tasks', JSON.stringify(tasks)); 
}

function action() {
  let del = qsa(".del");
  for(let i=0; i<del.length; i++) {
    del[i].addEventListener("click", function(ev) {deleteTask(ev.target.closest('.b').id);
  });
  }
  let com = qsa(".completed");
  for(let i=0; i<com.length; i++) {
    com[i].addEventListener("click", function(ev){completeTask(ev.target.closest('.b').id);
  });
  }
  let edit = qsa(".edit");
  for(let i=0; i<edit.length; i++) {
    edit[i].addEventListener("click", function(ev) {editTask(ev.target.closest('.b').id);
  });
  }
  let save = qsa(".save");
  for(let i=0; i<save.length; i++) {
    save[i].addEventListener("click", function(ev) {saveTask(ev.target.closest('.b').id);
  });
  }
}

function editTask(id) {
  // debugger;
  console.log(id);
  let editInput = qsa(".editInput");
  let edit = qsa(".edit");
  let save = qsa(".save");
  // console.log(id);
  for (let i = 0; i < editInput.length; i++) {
    if(editInput[i].id == id) {
      editInput[i].readOnly = false;
      edit[i].style.display = "none";
      save[i].style.display = "block";
      action();
      // console.log(editInput[i]);
      // renderInUI();
    }
    // renderInUI();
  }
  localStorage.setItem('tasks', JSON.stringify(tasks)); 
}

function saveTask(id) {
  // debugger;
  let editInput = qsa(".editInput");
  let edit = qsa(".edit");
  let save = qsa(".save");
  for (let i = 0; i < editInput.length; i++) {
    if(editInput[i].id == id) {
      editInput[i].readOnly = true;
      tasks[i].task = editInput[i].value;
      edit[i].style.display = "block";
      save[i].style.display = "none";
      saveTaskInUI();
      // console.log(editInput[i]);
    }
  }
  localStorage.setItem('tasks', JSON.stringify(tasks)); 
}

function saveTaskInUI() {
  renderInUI();
  action();
}

function changeBG(){
  // print("came here");
  for(let i =0; i<tasks.length; i++) {
    if(tasks[i].done == "Finished") {
      // print("came here if" );
      qs(`.bg${tasks[i].id}`).style.backgroundColor = "#C4E6CD";
    } 
    else {
      // print("came here else");
      qs(`.bg${tasks[i].id}`).style.backgroundColor = "#FFCCCC";
    }
  }
}

renderInUI();
action();
