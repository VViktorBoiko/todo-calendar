document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const date = urlParams.get("date");
    document.getElementById("selected-date").innerText = date;

    document.getElementById("add-task-btn").addEventListener("click", () => {
        document.getElementById("task-modal").style.display = "block";
    });

    document.getElementById("close-modal").addEventListener("click", () => {
        document.getElementById("task-modal").style.display = "none";
    });

    document.getElementById("save-task").addEventListener("click", () => {
        let taskText = document.getElementById("task-text").value;
        if (!taskText.trim()) return;

        let taskElement = document.createElement("div");
        taskElement.innerText = taskText;
        document.getElementById("task-list").appendChild(taskElement);

        document.getElementById("task-modal").style.display = "none";
        document.getElementById("task-text").value = "";
    });
});
