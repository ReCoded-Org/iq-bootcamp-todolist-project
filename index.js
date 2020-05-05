document.addEventListener('DOMContentLoaded', run);

function run() {

    initializeMaterialize();
    setTodaysDate();
    initializePriorities();

    let addTaskBtn = document.getElementById('addTask')
    let taskForm = document.getElementById('taskForm')
    let cancelTaskBtn = document.getElementById('cancelTask')

    addTaskBtn.addEventListener('click', function () {
        taskForm.classList.remove('hidden');
        addTaskBtn.classList.add('hidden');
    })

    cancelTaskBtn.addEventListener('click', function () {
        taskForm.classList.add('hidden');
        addTaskBtn.classList.remove('hidden');
    })

    addTask.addEventListener('click', addTask());

}

function initializeMaterialize() {
    M.Datepicker.init(document.querySelectorAll('.datepicker'));
    M.Dropdown.init(document.querySelectorAll('#dropdownEllipsis'));
}

function setTodaysDate() {
    months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');

    let todaysDate = document.getElementById('todaysDate');
    let date = new Date();
    curMonth = months[date.getMonth()];
    curDay = date.getDay();
    todaysDate.innerHTML = `<span class="font-bold">Today:</span> ${curMonth} ${curDay}`
}

function initializePriorities() {
    let priorities = [1, 2, 3]
    let prioritiesSelect = document.getElementById('prioritiesSelect');

    priorities.forEach(priority => {
        prioritiesSelect.insertAdjacentHTML('beforeend', `<option>Priority ${priority}</option>`)
    })
}

function addTask(taskTitle, priority, createdDate, deadline) {

}

function deleteTask(id) {

}

function doneTask() {

}