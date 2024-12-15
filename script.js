const timeElement = document.getElementById("timeElement");
const days = document.querySelectorAll(".day"); 

function updateTime() {
    const now = new Date();

    
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    const clockStr = `${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
    timeElement.innerText = clockStr;

    
    const currentDay = now.getDay(); 
    highlightDay(currentDay);
}

function highlightDay(currentDay) {
    
    days.forEach(day => day.classList.remove("highlight"));

   
    const dayMap = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const currentDayElement = document.getElementById(dayMap[currentDay]);
    currentDayElement.classList.add("highlight");
}


updateTime();
setInterval(updateTime, 1000);
