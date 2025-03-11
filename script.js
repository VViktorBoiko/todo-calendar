function generateCalendar() {
    let calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    let daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    
    for (let i = 1; i <= daysInMonth; i++) {
        let day = document.createElement("div");
        day.className = "day";
        day.innerText = i;
        day.onclick = () => window.location.href = `day.html?date=${i}`;
        calendar.appendChild(day);
    }
}

document.addEventListener("DOMContentLoaded", generateCalendar);
