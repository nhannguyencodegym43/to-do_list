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

function showCongrats(taskName) {
    const message = document.getElementById('congratsMessage');
    message.innerText = `Yay! You’ve completed "${taskName}"! 🎉`;
    message.classList.remove('hidden');
    setTimeout(() => {
        message.classList.add('hidden');
    }, 3000);
}