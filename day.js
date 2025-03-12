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
    let taskTitle = document.getElementById("taskTitleInput").value;
    let taskTime = document.getElementById("taskTimeInput").value;
    let taskDescription = document.getElementById("taskInput").value;

    if (taskTitle && taskDescription) {
        let taskList = document.getElementById("taskList");
        let taskItem = document.createElement("div");
        taskItem.className = "task-item";
        taskItem.innerHTML = `<strong>${taskTitle}</strong> at ${taskTime} <br> ${taskDescription}`;
        taskList.appendChild(taskItem);

        document.getElementById("taskTitleInput").value = "";
        document.getElementById("taskTimeInput").value = "";
        document.getElementById("taskInput").value = "";

        closeTaskModal();
    } else {
        alert("Please fill out all fields!");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let params = new URLSearchParams(window.location.search);
    let date = params.get("date");
    document.getElementById("taskTitle").innerText = `Tasks for ${new Date().getFullYear()}-${new Date().getMonth() + 1}-${date}`;
});
