let currentDate = new Date();

document.addEventListener("DOMContentLoaded", function () {
    generateCalendar();
    loadTodayTasks(); // Загружаем задачи за сегодня под календарем
});

function generateCalendar() {
    let calendar = document.getElementById("calendar");
    let monthLabel = document.getElementById("currentMonth");

    calendar.innerHTML = "";
    monthLabel.innerText = currentDate.toLocaleString("en-US", { month: "long", year: "numeric" });

    let firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    let daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    let today = new Date();
    let todayDay = today.getDate();
    let todayMonth = today.getMonth();
    let todayYear = today.getFullYear();

    // Создаем пустые ячейки перед первым днем месяца
    for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
        let emptyDay = document.createElement("div");
        calendar.appendChild(emptyDay);
    }

    // Генерация дней месяца
    for (let i = 1; i <= daysInMonth; i++) {
        let day = document.createElement("div");
        day.className = "day";
        day.innerText = i;

        // ✅ Если день сегодня — выделяем
        if (i === todayDay && currentDate.getMonth() === todayMonth && currentDate.getFullYear() === todayYear) {
            day.classList.add("today");
        }

        day.onclick = () => window.location.href = `day.html?date=${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${i}`;
        calendar.appendChild(day);
    }
}

// Переключение месяцев
function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar();
}

// ✅ **Функция загрузки сегодняшних задач под календарем**
function loadTodayTasks() {
    let today = new Date();
    let todayDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    let tasks = JSON.parse(localStorage.getItem(`tasks-${todayDate}`)) || [];
    let taskList = document.getElementById("todayTaskList");

    taskList.innerHTML = ""; // Очищаем список перед загрузкой

    tasks.forEach(task => {
        let taskItem = document.createElement("div");
        taskItem.classList.add("task-card");
        taskItem.innerHTML = `
            <h3>${task.title}</h3>
            <p><strong>Time:</strong> ${task.time}</p>
            <p>${task.text}</p>
        `;
        taskList.appendChild(taskItem);
    });
}
