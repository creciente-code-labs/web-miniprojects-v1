/* I need:
1. Get new task and save in local storage
2. Show the list tasks
3. When the new task is create, this tasks will be shown in the list in real time
4. Create a object task
5. Clear the task input for a new task
6. Show a notification when the task is created, modify or deleted
7. Catch error if is necesary
8. Modify tasks (edit/delete) */

let now = Date.now();
let id = parseInt(localStorage.getItem("contador")) || 0;
const body = document.body;

const nameTask = document.getElementById("task-input");
const listTasks = JSON.parse(localStorage.getItem("listTasks")) || [];
const sectionList = document.querySelector(".list-tasks");
const buttonCreate = document.querySelector(".button-task");


/* ------------------------------------------------ */

/* If section is empty, show a text in section */


/* Save to local storage */
buttonCreate.addEventListener("click", () => {
    /* First create the object task */
    let objectTask={
    /* Need: date registered(date automatic asigned in base its creation), name task, status, time transcurring before complete */
    id: id++,
    dateStart: now,
    nameTask: nameTask.value,
    status: "pending",
    timeTranscurring: 0 
    }

    /* Save the task */
    if(nameTask.value.trim() !== ""){
        listTasks.push(objectTask);
        localStorage.setItem("listTasks", JSON.stringify(listTasks));
        nameTask.value = "";
        console.log(listTasks);
    }
    localStorage.setItem("contador", id);
    /* Update list of items */
    updatedList();
});

function updatedList(){
    localStorage.setItem("listTasks", JSON.stringify(listTasks));
    /* we need mantein the current state for exapmple if the user refresh the page and one task is completed, the task must remain completed */
    listTasks.forEach(task => {
        const taskItem = sectionList.querySelector(`.task-item[data-id="${task.id}"]`);
        if (taskItem) {
            if (task.status === "completed") {
                taskItem.classList.add("completed");
            } else {
                taskItem.classList.remove("completed");
            }
        }
    });
    
    showListTasks();
}

function showListTasks() {

    // Clear the current list
    sectionList.innerHTML = "";

    if(listTasks.length === 0){
        const textEmpty = document.createElement("p");
        const description = document.createElement("p-description");
        textEmpty.textContent="No tasks yet";
        description.textContent="Create a new task using the form above.";
        sectionList.appendChild(textEmpty);
        sectionList.appendChild(description);
    }
    // Show the updated list of tasks
    listTasks.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task-item");
        taskElement.dataset.id = task.id;
        taskElement.textContent = task.nameTask;
        sectionList.appendChild(taskElement);

        const taskActions = document.createElement("div");
        taskActions.classList.add("task-actions");
        taskActions.innerHTML = `
            <button class="complete">Ok</button>
            <button class="edit-task">i</button>
            <button class="delete-task">X </button>
        `;
        taskElement.appendChild(taskActions);


        if (task.status === "complete") {
            taskElement.classList.add("completed");
            taskActions.querySelector(".complete").disabled = true;
        }

        

    });

}



const detailTask = document.querySelector(".task-details");

const name = document.querySelector(".name");
const date = document.querySelector(".date");
const status2 = document.querySelector(".status");
const time = document.querySelector(".time");

let duration = 0;

/* Event delegation for dinamic objects */
sectionList.addEventListener("click", (e) => {
    const deleteButton = e.target.closest(".delete-task");
    if (deleteButton) {
        const taskItem = deleteButton.closest(".task-item");/* Found container father when the id is storage*/
        const taskId = parseInt(taskItem.dataset.id);
        const taskIndex = listTasks.findIndex(task => task.id === taskId);

        listTasks.splice(taskIndex, 1);
        updatedList();
    }

    
    const detailButton = e.target.closest(".edit-task");
    if (detailButton) {
        const taskItem = detailButton.closest(".task-item");
        const taskId = parseInt(taskItem.dataset.id);
        const task = listTasks.find(task => task.id === taskId);

        console.log("Edit task:", task);

        detailTask.classList.toggle("active");
        name.textContent = task.nameTask;
        date.textContent = new Date(task.dateStart).toLocaleString();
        status2.textContent ="Status: "+task.status;

        /* Time transcurrir maybe is better if we focus on timer,an acumulative time, so we need storage the time */
        if (task.status !== "complete") {
            
        }

    }

    const okbutton = e.target.closest(".complete");
    if(okbutton){
        /* First we need to tach the name in list, second we need to change the status to complete and the time transcurrir is satatic, don[t change anymore*/

        const taskItem = okbutton.closest(".task-item");
        const taskId = parseInt(taskItem.dataset.id);
        const task = listTasks.find(task => task.id === taskId);

        task.status = "complete";
        task.timeTranscurring = task.timeTranscurring;
        /* we need to mark the name, like a line under the text and the background change to green and disable the button OK */
        taskItem.classList.add("completed");
        okbutton.disabled = true;
        updatedList();
    }
});



detailTask.addEventListener("click", (e) => {
    if (e.target.classList.contains("close")) {
        detailTask.classList.remove("active");
    }
});

/* ------------------------------- */


/* Switch */
const html = document.documentElement;

const checkBox = document.querySelector(".div-switch");
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  html.setAttribute("data-theme", savedTheme);

  if (savedTheme === "dark") {
    checkBox.checked = true;
  }
}

/* When checkbox is active, dark mode is active too [data-theme="dark"]*/
checkBox.addEventListener("change", () => {
   if (checkBox.checked) {
    html.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    html.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }


});
/* ---------------------------------------- */

/* We need timer */
const timer = document.querySelector(".timer");
const hours = document.querySelector(".hours");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
let horas = 0;
let minutos = 0;
let segundos = 0;
let clock = null; 
let clickstop=0;

function updateDisplay(){
       hours.textContent = String(horas).padStart(2, "0");
       minutes.textContent = String(minutos).padStart(2, "0");
       seconds.textContent = String(segundos).padStart(2, "0");
   };

const startBtn = document.querySelector(".start-timer");
const stopBtn = document.querySelector(".stop-timer");



// Start timer
startBtn.addEventListener("click", (e) => {
  if (clock) return; //

  clock = setInterval(() => {
    segundos++;

    if (segundos === 60) {
      segundos = 0;
      minutos++;
    }

    if (minutos === 60) {
      minutos = 0;
      horas++;
    }

    if (horas === 24) {
      horas = 0;
    }

    updateDisplay();
  }, 1000);

  if (clickstop === 1) {
    clickstop = 0; // Reset clickstop if timer is started again
  }

  
});

// Stop timer
stopBtn.addEventListener("click", () => {
  if (clock) {
    clearInterval(clock);
    clock = null;
  }

  /* Now if clickstop is 2 abo 1s between clicks, refresh the timer */
  clickstop++;
  if (clickstop === 2) {
    clearInterval(clock);
    clock = null;
    horas = 0;
    minutos = 0;
    segundos = 0;
    updateDisplay();
    clickstop = 0;
  }

});

/* For this timer we use setinterval, but for most precision we can use date.now */

/* -------------------------------------------- */

/* We need a state for onload */
onload = function() {

    updatedList();
}