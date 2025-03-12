document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const date = params.get("date");

    document.getElementById("taskTitle").innerText = `Tasks for ${date}`;

    loadTasks(date);
});

function showTaskModal() {
    document.getElementById("taskModal").style.display = "block";
}

function closeTaskModal() {
    document.getElementById("taskModal").style.display = "none";
}

function goBack() {
    window.location.href = "index.html";
}

function addTask() {
    const title = document.getElementById("taskTitleInput").value.trim();
    const time = document.getElementById("taskTimeInput").value;
    const taskText = document.getElementById("taskInput").value.trim();

    if (title === "" || taskText === "") return;

    const params = new URLSearchParams(window.location.search);
    const date = params.get("date");

    const task = { title, time, text: taskText };

    let tasks = JSON.parse(localStorage.getItem(date)) || [];
    tasks.push(task);
    localStorage.setItem(date, JSON.stringify(tasks));

    closeTaskModal();
    loadTasks(date);
}

function loadTasks(date) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    const tasks = JSON.parse(localStorage.getItem(date)) || [];

    tasks.forEach((task, index) => {
        const taskCard = document.createElement("div");
        taskCard.classList.add("task-card");

        taskCard.innerHTML = `
            <h3>${task.title}</h3>
            <p><strong>Time:</strong> ${task.time || "No time set"}</p>
            <p>${task.text}</p>
            <button onclick="deleteTask('${date}', ${index})">Delete</button>
        `;

        taskList.appendChild(taskCard);
    });
}
