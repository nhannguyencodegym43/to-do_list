document.getElementById('nameInput').focus();
function startApp() {
    const name = document.getElementById('nameInput').value;
    if (!name) {
        alert("Please enter your name!");
        return;
    }
    document.getElementById('name-section').classList.add('hidden');

    const now = new Date();
    const hour = now.getHours();
    let timeGreeting = "";

    if (hour < 12) {
        timeGreeting = "Good morning";
    } else if (hour < 18) {
        timeGreeting = "Good afternoon";
    } else {
        timeGreeting = "Good evening";
    }

    document.getElementById('greetText').innerText = `${timeGreeting}, ${name}!`;
    document.getElementById('greeting').classList.remove('hidden');
    document.getElementById('task-section').classList.remove('hidden');
    document.getElementById('taskInput').focus();
    document.getElementById('showCompletedTasks').classList.remove('hidden');
}
document.getElementById('nameInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        startApp();
    }
});

function addTask() {
    const task = document.getElementById('taskInput').value;
    if (!task) {
        alert("Please enter a task!");
        return;
    }

    const bottle = document.createElement('div');
    bottle.className = 'bottle';
    bottle.innerHTML = `<span>${task}</span>`;
    bottle.onclick = function() {
        this.style.backgroundImage = "url('images/empty-bottle.png')";
        const taskName = this.querySelector('span').innerText;
        this.querySelector('span').innerText = '';
        setTimeout(() => {
            this.remove();
            showCongrats(taskName);
        }, 800);
    };

    document.getElementById('bottles').appendChild(bottle);
    document.getElementById('taskInput').value = '';
}
document.getElementById('taskInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});
let completedTasks = [];

function showCompletedTasks() {
    const modal = document.getElementById('completedTasksModal');
    const list = document.getElementById('completedTasksList');
    list.innerHTML = '';

    if (completedTasks.length === 0) {
        list.innerHTML = '<li>No completed tasks yet!</li>';
    } else {
        completedTasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = task;

            const restoreButton = document.createElement('button');
            restoreButton.textContent = 'Restore';
            restoreButton.className = 'restore-button';
            restoreButton.onclick = function () {
                restoreTask(task);
            };

            listItem.appendChild(restoreButton);
            list.appendChild(listItem);
        });
    }

    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('completedTasksModal').classList.add('hidden');
}

function showCongrats(taskName) {
    completedTasks.push(taskName);
    const message = document.getElementById('congratsMessage');
    message.textContent = `Yay! You’ve completed "${taskName}"! 🎉`;
    message.classList.remove('hidden');
    setTimeout(() => {
        message.classList.add('hidden');
    }, 2000);
}

function restoreTask(task) {
    const taskIndex = completedTasks.indexOf(task);
    if (taskIndex !== -1) {
        completedTasks.splice(taskIndex, 1);
        const bottle = document.createElement('div');
        bottle.className = 'bottle';
        bottle.innerHTML = `<span>${task}</span>`;
        bottle.onclick = function () {
            this.style.backgroundImage = "url('images/empty-bottle.png')";
            const taskName = this.querySelector('span').innerText;
            this.querySelector('span').innerText = '';
            setTimeout(() => {
                this.remove();
                showCongrats(taskName);
            }, 800);
        };

        document.getElementById('bottles').appendChild(bottle);
        const list = document.getElementById('completedTasksList');
        const listItem = Array.from(list.children).find(
            (item) => item.textContent.includes(task)
        );
        if (listItem) {
            listItem.remove();
        }
    }
}