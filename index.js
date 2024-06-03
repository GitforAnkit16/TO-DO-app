document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('add-task-btn');
    const newTaskInput = document.getElementById('new-task-input');
    const timeEstimateInput = document.getElementById('time-estimate-input');
    const deadlineInput = document.getElementById('deadline-input');
    const pendingTasksList = document.getElementById('pending-tasks');
    const completedTasksList = document.getElementById('completed-tasks');
    const toggleDarkModeBtn = document.getElementById('toggle-dark-mode');

    addTaskBtn.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        const timeEstimate = timeEstimateInput.value.trim();
        const deadline = deadlineInput.value;
        if (taskText !== '') {
            addTask(taskText, timeEstimate, deadline);
            newTaskInput.value = '';
            timeEstimateInput.value = '';
            deadlineInput.value = '';
        }
    });

    toggleDarkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        toggleDarkModeBtn.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
    });

    function addTask(taskText, timeEstimate, deadline) {
        const taskItem = createTaskItem(taskText, timeEstimate, deadline);
        pendingTasksList.appendChild(taskItem);
    }

    function createTaskItem(taskText, timeEstimate, deadline) {
        const li = document.createElement('li');
        li.className = 'task-item';

        const span = document.createElement('span');
        span.textContent = `${taskText} (Created: ${new Date().toLocaleString()})`;

        if (timeEstimate) {
            const timeEstimateSpan = document.createElement('span');
            timeEstimateSpan.textContent = `Estimated time: ${timeEstimate}`;
            span.appendChild(document.createElement('br'));
            span.appendChild(timeEstimateSpan);
        }

        if (deadline) {
            const deadlineSpan = document.createElement('span');
            deadlineSpan.textContent = `Deadline: ${new Date(deadline).toLocaleString()}`;
            span.appendChild(document.createElement('br'));
            span.appendChild(deadlineSpan);
        }

        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'task-buttons';

        const completeBtn = document.createElement('button');
        completeBtn.className = 'complete-btn';
        completeBtn.innerHTML = '&#9989;'; 
        completeBtn.addEventListener('click', () => completeTask(li, taskText, timeEstimate, deadline));

        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.innerHTML = '✏️';
        editBtn.addEventListener('click', () => editTask(li, taskText, timeEstimate, deadline));

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '❌';
        deleteBtn.addEventListener('click', () => deleteTask(li));

        const reminderBtn = document.createElement('button');
        reminderBtn.className = 'reminder-btn';
        reminderBtn.innerHTML = '⏰';
        reminderBtn.addEventListener('click', () => setReminder(taskText, deadline));

        buttonsDiv.appendChild(completeBtn);
        buttonsDiv.appendChild(editBtn);
        buttonsDiv.appendChild(deleteBtn);
        buttonsDiv.appendChild(reminderBtn);
        li.appendChild(span);
        li.appendChild(buttonsDiv);
        return li;
    }
    function completeTask(taskItem, taskText, timeEstimate, deadline) {
        taskItem.classList.add('completed');
        const buttonsDiv = taskItem.querySelector('.task-buttons');
        buttonsDiv.innerHTML = ''; 
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '❌';
        deleteBtn.addEventListener('click', () => deleteTask(taskItem));

        buttonsDiv.appendChild(deleteBtn); 

        const span = taskItem.querySelector('span');
        span.textContent = `${taskText} (Completed: ${new Date().toLocaleString()})`;

        if (timeEstimate) {
            const timeEstimateSpan = document.createElement('span');
            timeEstimateSpan.textContent = `Estimated time: ${timeEstimate}`;
            span.appendChild(document.createElement('br'));
            span.appendChild(timeEstimateSpan);
        }

        if (deadline) {
            const deadlineSpan = document.createElement('span');
            deadlineSpan.textContent = `Deadline: ${new Date(deadline).toLocaleString()}`;
            span.appendChild(document.createElement('br'));
            span.appendChild(deadlineSpan);
        }
        completedTasksList.appendChild(taskItem);
    }
    function editTask(taskItem, taskText, timeEstimate, deadline) {
        const newTaskText = prompt('Edit task:', taskText);
        const newTimeEstimate = prompt('Edit estimated time:', timeEstimate);
        const newDeadline = prompt('Edit deadline (YYYY-MM-DDTHH:MM):', deadline);

        if (newTaskText !== null && newTaskText.trim() !== '') {
            taskItem.querySelector('span').textContent = `${newTaskText} (Created: ${new Date().toLocaleString()})`;

            if (newTimeEstimate !== null && newTimeEstimate.trim() !== '') {
                const timeEstimateSpan = document.createElement('span');
                timeEstimateSpan.textContent = `Estimated time: ${newTimeEstimate}`;
                taskItem.querySelector('span').appendChild(document.createElement('br'));
                taskItem.querySelector('span').appendChild(timeEstimateSpan);
            }
            if (newDeadline !== null && newDeadline.trim() !== '') {
                const deadlineSpan = document.createElement('span');
                deadlineSpan.textContent = `Deadline: ${new Date(newDeadline).toLocaleString()}`;
                taskItem.querySelector('span').appendChild(document.createElement('br'));
                taskItem.querySelector('span').appendChild(deadlineSpan);
            }
        }
    }
    function deleteTask(taskItem) {
        taskItem.remove();
    }
    function setReminder(taskText, deadline) {
        if (deadline) {
            const reminderTime = new Date(deadline).getTime() - new Date().getTime();
            if (reminderTime > 0) {
                alert(`Reminder set for: ${new Date(deadline).toLocaleString()}`);
                setTimeout(() => {
                    alert(`Reminder: ${taskText}`);
                }, reminderTime);
            } else {
                alert('Deadline has already passed!');
            }
        } else {
            alert('No deadline set for this task.');
        }
    }
});
