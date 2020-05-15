document.addEventListener('DOMContentLoaded', run);

let dateInstance = M.Datepicker.init(document.querySelectorAll('.datepicker'));
let tasksList = document.getElementById('tasksList')
let tasks = [];
let formAddBtn = document.querySelector('form')
let taskForm = document.getElementById('taskForm')
let title = document.getElementById('title');
let deadline = document.getElementById('deadline');
let noTasksText = document.querySelector('.no-tasks');

function run() {

    initializeMaterialize();
    setTodaysDate();
    initializeTasks(tasks);

    formAddBtn.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(title.value,
            new Date, deadline.value)
    });
}

function initializeMaterialize() {
    M.Dropdown.init(document.querySelectorAll('#dropdownEllipsis'));
    let d = new Date();
    d.setDate(d.getDate() - 1); // getting the date of yesterday
    dateInstance[0].options.minDate = d;
}

function setTodaysDate() {
    let todaysDate = document.getElementById('todaysDate');
    let date = new Date();
    let curMonth = monthsNames(date.getMonth());
    let curDay = date.getDay();
    console.log(date);

    todaysDate.innerHTML = `<span class="font-bold">Today:</span> ${curMonth} ${curDay}`
}

function monthsNames(index) {
    let months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
    return months[index]
}

function initializeTasks(tasks) {
    tasksList.innerHTML = '';
    if (tasks.length !== 0) {
        noTasksText.classList.add('hidden');
        tasks.forEach(task => addTaskToList(task));
    } else {
        noTasksText.classList.remove('hidden');
    }
}

function addTaskToList(task) {

    tasksList.insertAdjacentHTML('beforeend', `
        <li>
            <div class="flex flex-col">
                <div class="flex flex-row justify-between items-center">
                    <div class="flex flex-row">                        
                        <div>
                            <p class="text-lg task-title">${task.taskTitle}</p>
                            <div class="flex text-gray-600 text-sm">
                                <p class="p-1">${task.deadline}</p>                    
                            </div>
                        </div>
                    </div>
                     
                </div>
                <hr class="my-3 ml-5">
            </div>
        </li>
    `)
}

function addTask(taskTitle, createdDate, deadline) {
    tasks.push({ taskTitle, createdDate, deadline })
    initializeTasks(tasks);
    resetInputs();
}

function resetInputs() {
    title.value = '';
    deadline.value = '';
}