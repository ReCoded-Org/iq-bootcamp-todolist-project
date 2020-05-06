document.addEventListener('DOMContentLoaded', run);

let dateInstance = M.Datepicker.init(document.querySelectorAll('.datepicker'));
let tasksList = document.getElementById('tasksList')
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let addTaskBtn = document.getElementById('addTask')
let formAddBtn = document.querySelector('form')
let taskForm = document.getElementById('taskForm')
let cancelTaskBtn = document.getElementById('cancelTask')
let prioritiesSelect = document.getElementById('prioritiesSelect');
let title = document.getElementById('title');


function run() {

    initializeMaterialize();
    setTodaysDate();
    initializePriorities();


    initializeTasks(tasks);
    let doneTaskBtns = document.getElementsByClassName('done-task');
    let deleteTaskBtns = document.getElementsByClassName('delete-task');



    addTaskBtn.addEventListener('click', function () {
        taskForm.classList.remove('hidden');
        addTaskBtn.classList.add('hidden');
    })

    cancelTaskBtn.addEventListener('click', function () {
        taskForm.classList.add('hidden');
        addTaskBtn.classList.remove('hidden');
    })

    formAddBtn.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(title.value, prioritiesSelect.options[prioritiesSelect.selectedIndex].value, new Date, dateInstance[0].date)
    });

    for (let i = 0; i < doneTaskBtns.length; i++) {
        doneTaskBtns[i].addEventListener('click', (e) => {
            e.preventDefault();
            doneTask(i)
        });
    }

    //fix deleting only one item
    for (let index = 0; index < deleteTaskBtns.length; index++) {
        deleteTaskBtns[index].addEventListener('click', (e) => {
            e.preventDefault();
            deleteTask(index);
        })
    }

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
    curMonth = monthsNames(date.getMonth());
    curDay = date.getDay();
    todaysDate.innerHTML = `<span class="font-bold">Today:</span> ${curMonth} ${curDay}`
}

function monthsNames(index) {
    let months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
    return months[index]
}

function initializePriorities() {
    let priorities = [1, 2, 3]
    let prioritiesSelect = document.getElementById('prioritiesSelect');

    priorities.forEach(priority => {
        prioritiesSelect.insertAdjacentHTML('beforeend', `<option>Priority ${priority}</option>`)
    })
}

function initializeTasks(tasks) {
    tasksList.innerHTML = '';
    tasks?.forEach(task => addTaskToList(task));
}

function addTaskToList(task) {
    // let deadlineToDate = new Date(task.deadline.substring(0, 10));
    // let deadline = `${monthsNames(deadlineToDate.getMonth())} ${deadlineToDate.getDay()}`
    let priorityColor = getPriorityColor(task.priority);

    tasksList.insertAdjacentHTML('beforeend', `
        <li>
            <div class="flex flex-col">
                <div class="flex flex-row justify-between items-center">
                    <div class="flex flex-row">
                        <div class="w-12 h-12 flex items-center justify-center">
                            <a href="#" class="text-black check done-task">
                                <i class="far fa-lg fa-circle icon-uncheck"></i>
                                <i class="far fa-lg fa-check-circle icon-check"></i>
                            </a>
                        </div>
                        <div>
                            <p class="text-lg task-title">${task.taskTitle}</p>
                            <div class="flex text-gray-600 text-sm">
                                <p class="p-1">${task.deadline}</p>
                                <p class="p-1 ${priorityColor}">${task.priority}</p>
                            </div>
                        </div>
                    </div>
                    <a href="#"
                        class="flex items-center justify-center hover:bg-gray-200 w-8 h-8 rounded-full text-gray-700 delete-task">
                        <i class="fas fa-trash"></i>
                    </a>

                 
                </div>
                <hr class="my-3 ml-5">
            </div>
        </li>
    `)
}

function getPriorityColor(priority) {
    if (priority === 'Priority 1') {
        return 'text-red-500';
    } else if (priority === 'Priority 2') {
        return 'text-yellow-500';
    } else {
        return 'text-green-500';
    }
}

function addTask(taskTitle, priority, createdDate, deadline) {
    tasks.push({ taskTitle, priority, createdDate, deadline })
    initializeTasks(tasks);

    // date is coverted to string too
    localStorage.setItem('tasks', JSON.stringify(tasks));

    resetInputs();
}

// postpone this for now
// function getTaskIndexAfterFiltering(priority, createdDate, deadline) {
//     // index = 0;
//     tasks.forEach(task => {
//         if (task.priority === priority) {
//             console.log('here priority');

//             if (task.deadline === deadline) {
//                 console.log('here deadline');

//                 if (new Date(tasks.createdDate) === createdDate) {
//                     console.log(task.title + 'true');
//                 }
//             }
//         }
//     })
// }

function deleteTask(index) {
    console.log(index);

    // let deleteTaskBtns = document.getElementsByClassName('delete-task');
    // for (let index = 0; index < deleteTaskBtns.length; index++) {
    //     deleteTaskBtns[index].addEventListener('click', (e) => {
    //         e.preventDefault();

    //         tasks.splice(index, 1)
    //         localStorage.setItem('tasks', JSON.stringify(tasks))
    //         initializeTasks(tasks);
    //     })

    // }

    tasks.splice(index, 1)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    initializeTasks(tasks);
}

function doneTask(index) {
    let taskTitles = document.getElementsByClassName('task-title');
    // Todo make these icons show checked when the task is checked
    // let iconCheck = document.getElementsByClassName('icon-check');
    // let iconUncheck = document.getElementsByClassName('icon-uncheck');

    if (taskTitles[index].classList.contains('line-through')) {
        taskTitles[index].classList.remove('line-through')
    } else
        taskTitles[index].classList.add('line-through')
}

function resetInputs() {

}