async function generateCalendar() {
    let calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    let daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    
    // 1️⃣ Получаем задачи с бэкенда
    let tasksByDate = await fetchTasks();

    for (let i = 1; i <= daysInMonth; i++) {
        let day = document.createElement("div");
        day.className = "day";
        day.innerText = i;

        let dateStr = formatDate(i); // Форматируем дату под API

        // 2️⃣ Проверяем, есть ли задачи на этот день
        if (tasksByDate[dateStr]) {
            day.classList.add("has-tasks"); // Добавляем класс (CSS)
        }

        // 3️⃣ При клике переходим на страницу с задачами
        day.onclick = () => window.location.href = `day.html?date=${dateStr}`;

        calendar.appendChild(day);
    }
}

// 🟢 Функция получения задач с API
async function fetchTasks() {
    try {
        let response = await fetch("https://todo-calendar-backend-production.up.railway.app/tasks");
        let tasks = await response.json();
        
        let tasksByDate = {};
        tasks.forEach(task => {
            if (!tasksByDate[task.date]) {
                tasksByDate[task.date] = [];
            }
            tasksByDate[task.date].push(task);
        });

        return tasksByDate;
    } catch (error) {
        console.error("Ошибка загрузки задач:", error);
        return {};
    }
}

// 🟢 Функция форматирования даты (YYYY-MM-DD)
function formatDate(day) {
    let year = new Date().getFullYear();
    let month = String(new Date().getMonth() + 1).padStart(2, "0");
    let dayStr = String(day).padStart(2, "0");
    return `${year}-${month}-${dayStr}`;
}

document.addEventListener("DOMContentLoaded", generateCalendar);
