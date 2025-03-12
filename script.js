let currentDate = new Date();

document.addEventListener("DOMContentLoaded", function () {
    generateCalendar();
});

function generateCalendar() {
    let calendar = document.getElementById("calendar");
    let monthLabel = document.getElementById("currentMonth");

    calendar.innerHTML = "";
    monthLabel.innerText = currentDate.toLocaleString("en-US", { month: "long", year: "numeric" });

    let firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    let daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
        let emptyDay = document.createElement("div");
        calendar.appendChild(emptyDay);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        let day = document.createElement("div");
        day.className = "day";
        day.innerText = i;
        day.onclick = () => window.location.href = `day.html?date=${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${i}`;
        calendar.appendChild(day);
    }
}

function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar();
}
