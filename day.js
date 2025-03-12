document.addEventListener("DOMContentLoaded", () => {
    let date = new URLSearchParams(window.location.search).get("date");
    document.getElementById("taskTitle").innerText = `Tasks for ${new Date().getFullYear()}-${new Date().getMonth() + 1}-${date}`;
    
    loadTasks(date);

    document.getElementById("taskForm").addEventListener("submit", async (event) => {
        event.preventDefault();
        await addTask(date);
    });
});

async function addTask(date) {
    let title = document.getElementById("taskTitleInput").value;
    let time = document.getElementById("taskTimeInput").value;
    let text = document.getElementById("taskInput").value;

    if (!title || !text) {
        alert("Please enter a task title and description.");
        return;
    }

    let newTask = { title, time, text, date, completed: false };

    try {
        let response = await fetch("https://your-backend-api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask),
        });

        if (response.ok) {
            closeTaskModal();
            loadTasks(date);
        } else {
            console.error("Error adding task:", response.statusText);
        }
    } catch (error) {
        console.error("Error adding task:", error);
    }
}
