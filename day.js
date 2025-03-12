document.addEventListener("DOMContentLoaded", function () {
    const taskTitle = document.getElementById("taskTitle");
    const taskList = document.getElementById("taskList");

    // Получаем дату из URL
    const params = new URLSearchParams(window.location.search);
    const date = params.get("date");

    if (date) {
        taskTitle.innerText = `Tasks for ${date}`;
    } else {
        taskTitle.innerText = "Tasks for Today";
    }

    // Загружаем задачи из localStorage
    loadTasks();
});

// Открытие окна добавления задач
function showTaskModal() {
    document.getElementById("taskModal").style.display = "block";
}

// Закрытие окна добавления задач
function closeTaskModal() {
    document.getElementById("taskModal").style.display = "none";
}

// Добавление задачи
function addTask() {
    const title = document.getElementById("taskTitleInput").value.trim();
    const time = document.getElementById("taskTimeInput").value.trim();
    const text = document.getElementById("taskInput").value.trim();
    const taskList = document.getElementById("taskList");

    if (!title || !time || !text) {
        alert("Please fill in all fields!");
        return;
    }

    const taskItem = document.createElement("div");
    taskItem.classList.add("task-card");
    taskItem.innerHTML = `
        <h3>${title}</h3>
        <p><strong>Time:</strong> ${time}</p>
        <p>${text}</p>
        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
    `;

    taskList.appendChild(taskItem);

    // Сохраняем задачу в localStorage
    saveTask({ title, time, text });

    // Закрываем модальное окно
    closeTaskModal();
}

// Удаление задачи
function deleteTask(button) {
    const taskItem = button.parentElement;
    taskItem.remove();

    // Обновляем localStorage
    updateLocalStorage();
}

// Сохранение задачи в localStorage
function saveTask(task) {
    const params = new URLSearchParams(window.location.search);
    const date = params.get("date") || "default";

    let tasks = JSON.parse(localStorage.getItem(`tasks-${date}`)) || [];
    tasks.push(task);
    localStorage.setItem(`tasks-${date}`, JSON.stringify(tasks));
}

// Загрузка задач при открытии страницы
function loadTasks() {
    const params = new URLSearchParams(window.location.search);
    const date = params.get("date") || "default";

    let tasks = JSON.parse(localStorage.getItem(`tasks-${date}`)) || [];
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Очищаем список перед загрузкой

    tasks.forEach(task => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-card");
        taskItem.innerHTML = `
            <h3>${task.title}</h3>
            <p><strong>Time:</strong> ${task.time}</p>
            <p>${task.text}</p>
            <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}

// Обновление localStorage после удаления
function updateLocalStorage() {
    const params = new URLSearchParams(window.location.search);
    const date = params.get("date") || "default";

    let tasks = [];
    document.querySelectorAll(".task-card").forEach(taskCard => {
        tasks.push({
            title: taskCard.querySelector("h3").innerText,
            time: taskCard.querySelector("p strong").innerText,
            text: taskCard.querySelectorAll("p")[1].innerText
        });
    });

    localStorage.setItem(`tasks-${date}`, JSON.stringify(tasks));
}

// Переход назад
function goBack() {
    window.location.href = "index.html";
}
