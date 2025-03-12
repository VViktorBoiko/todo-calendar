function generateCalendar() {
    let calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let firstDay = new Date(year, month, 1).getDay();
    let daysInMonth = new Date(year, month + 1, 0).getDate();

    // Adjust start for Monday as the first day
    let startDay = firstDay === 0 ? 6 : firstDay - 1;

    for (let i = 0; i < startDay; i++) {
        let empty = document.createElement("div");
        empty.className = "day empty";
        calendar.appendChild(empty);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        let day = document.createElement("div");
        day.className = "day";
        day.innerText = i;
        day.onclick = () => window.location.href = `day.html?date=${i}`;
        calendar.appendChild(day);
    }
}

document.addEventListener("DOMContentLoaded", generateCalendar);
