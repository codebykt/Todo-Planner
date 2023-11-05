$(document).ready(function() {
    // Load tasks from localStorage if available
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to update the task list
    function updateTaskList() {
        $('#taskList').empty();
        tasks.forEach(function(task) {
            var listItem = $('<li>').addClass('list-group-item d-flex justify-content-between align-items-center').append(
                $('<div>').append(
                    $('<small>').text(task.date + ' - '),
                    $('<span>').text(task.text)
                ),
                $('<button>').addClass('btn btn-warning completeTask').text(task.completed ? 'Completed' : 'Complete')
            );
            if (task.completed) {
                listItem.find('span').addClass('completed');
                listItem.find('button').addClass('btn-success').removeClass('btn-warning');
            }
            $('#taskList').append(listItem);
        });
    }

    // Load tasks on page load
    updateTaskList();

    $('#addTask').on('click', function() {
        var taskText = $('#taskInput').val();
        var taskDate = $('#dateInput').val();
        if (taskText !== '' && taskDate !== '') {
            tasks.push({ text: taskText, date: taskDate, completed: false });
            saveTasks();
            updateTaskList();
            $('#taskInput').val('');
            $('#dateInput').val('');
        }
    });

    $(document).on('click', '.completeTask', function() {
        var taskButton = $(this);
        var taskIndex = taskButton.parent().index();
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        saveTasks();
        updateTaskList();
    });
});
