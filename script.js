let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function generateCalendar(year, month) {
    let calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    // Устанавливаем текущий месяц в заголовке
    document.getElementById("currentMonth").innerText = `${monthNames[month]} ${year}`;

    let daysInMonth = new Date(year, month + 1, 0).getDate();
    let firstDay = new Date(year, month, 1).getDay();
    let offset = firstDay === 0 ? 6 : firstDay - 1; // Коррекция для недель

    // Добавляем пустые ячейки перед первым днем месяца
    for (let i = 0; i < offset; i++) {
        let empty = document.createElement("div");
        empty.className = "day empty";
        calendar.appendChild(empty);
    }

    // Заполняем дни месяца
    for (let i = 1; i <= daysInMonth; i++) {
        let day = document.createElement("div");
        day.className = "day";
        day.innerText = i;
        day.onclick = () => window.location.href = `day.html?date=${i}&month=${month + 1}&year=${year}`;
        calendar.appendChild(day);
    }
}

// Функция для переключения месяца
function changeMonth(direction) {
    currentMonth += direction;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentYear, currentMonth);
}

// Генерация календаря при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    generateCalendar(currentYear, currentMonth);
});
