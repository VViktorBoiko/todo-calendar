function generateCalendar() {
    let calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    let daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    let firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();

    let offset = firstDay === 0 ? 6 : firstDay - 1;
    
    for (let i = 0; i < offset; i++) {
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
