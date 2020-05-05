document.addEventListener('DOMContentLoaded', run);

function run() {
    M.Datepicker.init(document.querySelectorAll('.datepicker'));

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

}