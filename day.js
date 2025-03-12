document.addEventListener("DOMContentLoaded", () => {
    let date = new URLSearchParams(window.location.search).get("date");
    document.getElementById("taskTitle").innerText = `Tasks for ${new Date().getFullYear()}-${new Date().getMonth() + 1}-${date}`;
    
    loadTasks(date);

    document.getElementById("taskForm").addEventListener("submit", (event) => {
        event.preventDefault();
        addTask(date);
    });
});

function showTaskModal() {
    document.getElementById("taskModal").style.display = "block";
}

function closeTaskModal() {
    document.getElementById("taskModal").style.display = "none";
}

function goBack() {
    window.history.back();
}

async function loadTasks(date) {
    try {
        let response = await fetch(`https://your-backend-api/tasks?date=${date}`);
        let tasks = await response.json();
        let taskList = document.getElementById("taskList");
        taskList.innerHTML = "";
        
        tasks.forEach(task => {
            let taskItem = document.createElement("div");
            taskItem.className = "task-item";
            taskItem.innerHTML = `<b>${task.title}</b> (${task.time}) - ${task.text}`;
            taskList.appendChild(taskItem);
        });
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}

async function addTask(date) {
    let title = document.getElementById("taskTitleInput").value;
    let time = document.getElementById("taskTimeInput").value;
    let text = document.getElementById("taskInput").value;

    let newTask = { title, time, text, date, completed: false };

    try {
        await fetch("https://your-backend-api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask),
        });

        closeTaskModal();
        loadTasks(date);
    } catch (error) {
        console.error("Error adding task:", error);
    }
}
