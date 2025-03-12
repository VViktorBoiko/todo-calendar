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

    if (!title || !time || !text) {
        alert("Please fill in all fields!");
        return;
    }

    let tasks = getTasksFromStorage();
    const newTask = { title, time, text };
    tasks.push(newTask);
    saveTasksToStorage(tasks);

    addTaskToDOM(newTask, tasks.length - 1);

    closeTaskModal();
}

// Добавление задачи в DOM
function addTaskToDOM(task, index) {
    const taskList = document.getElementById("taskList");
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-card");

    taskItem.innerHTML = `
        <h3 contenteditable="false" class="task-title">${task.title}</h3>
        <p><strong>Time:</strong> <span class="task-time">${task.time}</span></p>
        <p contenteditable="false" class="task-text">${task.text}</p>
        <button class="edit-btn" onclick="editTask(${index}, this)">Edit</button>
        <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
    `;

    taskList.appendChild(taskItem);
}

// Редактирование задачи
function editTask(index, button) {
    let tasks = getTasksFromStorage();
    let taskItem = document.getElementById("taskList").children[index];

    let titleElement = taskItem.querySelector(".task-title");
    let textElement = taskItem.querySelector(".task-text");

    if (button.innerText === "Edit") {
        // Включить редактирование
        titleElement.contentEditable = "true";
        textElement.contentEditable = "true";
        titleElement.focus();
        button.innerText = "Save";
        button.classList.add("save-btn");
    } else {
        // Сохранить изменения
        tasks[index].title = titleElement.innerText.trim();
        tasks[index].text = textElement.innerText.trim();
        saveTasksToStorage(tasks);

        titleElement.contentEditable = "false";
        textElement.contentEditable = "false";
        button.innerText = "Edit";
        button.classList.remove("save-btn");
    }
}

// Удаление задачи
function deleteTask(index) {
    let tasks = getTasksFromStorage();
    tasks.splice(index, 1);
    saveTasksToStorage(tasks);
    loadTasks(); // Перезагрузить список задач
}

// Получение задач из localStorage
function getTasksFromStorage() {
    const params = new URLSearchParams(window.location.search);
    const date = params.get("date") || "default";
    return JSON.parse(localStorage.getItem(`tasks-${date}`)) || [];
}

// Сохранение задач в localStorage
function saveTasksToStorage(tasks) {
    const params = new URLSearchParams(window.location.search);
    const date = params.get("date") || "default";
    localStorage.setItem(`tasks-${date}`, JSON.stringify(tasks));
}

// Загрузка задач при открытии страницы
function loadTasks() {
    let tasks = getTasksFromStorage();
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        addTaskToDOM(task, index);
    });
}

// Переход назад
function goBack() {
    window.location.href = "index.html";
}

// Загружаем задачи при загрузке страницы
document.addEventListener("DOMContentLoaded", loadTasks);
