document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const date = params.get("date");
    const month = params.get("month");
    const year = params.get("year");

    document.getElementById("taskTitle").innerText = `Tasks for ${year}-${month}-${date}`;

    loadTasks(`${year}-${month}-${date}`);
});

function goBack() {
    window.location.href = "index.html";
}

function showTaskModal() {
    document.getElementById("taskModal").style.display = "flex";
}

function closeTaskModal() {
    document.getElementById("taskModal").style.display = "none";
}

function addTask() {
    const title = document.getElementById("taskTitleInput").value;
    const time = document.getElementById("taskTimeInput").value;
    const task = document.getElementById("taskInput").value;

    if (!task.trim()) return;

    const taskContainer = document.createElement("div");
    taskContainer.className = "task-container";

    taskContainer.innerHTML = `
        <h3>${title}</h3>
        <p><strong>Time:</strong> ${time}</p>
        <p>${task}</p>
        <button class="delete-btn" onclick="this.parentElement.remove()">Delete</button>
    `;

    document.getElementById("taskList").appendChild(taskContainer);

    closeTaskModal();
}
