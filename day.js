const backendUrl = "https://todo-calendar-backend-production.up.railway.app";

async function loadTasks() {
    const params = new URLSearchParams(window.location.search);
    const date = params.get("date");

    document.getElementById("selected-date").innerText = date;

    try {
        let response = await fetch(`${backendUrl}/tasks?date=${date}`);
        let tasks = await response.json();

        let taskList = document.getElementById("task-list");
        taskList.innerHTML = "";

        tasks.forEach(task => {
            let li = document.createElement("li");
            li.innerHTML = `
                <span>${task.text}</span>
                <button onclick="toggleTask('${task._id}')">${task.completed ? "✅" : "❌"}</button>
                <button onclick="deleteTask('${task._id}')">🗑</button>
            `;
            taskList.appendChild(li);
        });

    } catch (error) {
        console.error("Ошибка загрузки задач:", error);
    }
}

async function addTask() {
    const params = new URLSearchParams(window.location.search);
    const date = params.get("date");
    const text = document.getElementById("new-task-text").value;

    if (!text) return;

    try {
        await fetch(`${backendUrl}/tasks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, date, completed: false })
        });

        document.getElementById("new-task-text").value = "";
        loadTasks();
    } catch (error) {
        console.error("Ошибка добавления задачи:", error);
    }
}

async function toggleTask(id) {
    try {
        await fetch(`${backendUrl}/tasks/${id}/toggle`, { method: "PUT" });
        loadTasks();
    } catch (error) {
        console.error("Ошибка обновления задачи:", error);
    }
}

async function deleteTask(id) {
    try {
        await fetch(`${backendUrl}/tasks/${id}`, { method: "DELETE" });
        loadTasks();
    } catch (error) {
        console.error("Ошибка удаления задачи:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadTasks);
