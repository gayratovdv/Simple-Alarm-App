const currentTime = document.querySelector("h1"),
content = document.querySelector(".content"),
selectMenu = document.querySelectorAll("select"),
setAlarmBtn = document.querySelector("button");

let alarmTime,
    isAlarmSet = false,
    ringtone = new Audio("./images/twirling-intime-lenovo-k8-note-alarm-tone-41440.mp3");

for (let i = 12; i > 0; i--) {
    let hour = i < 10 ? "0" + i : i; 
    let option = `<option value="${hour}">${hour}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i > 0; i--) {
    let minute = i < 10 ? "0" + i : i; 
    let option = `<option value="${minute}">${minute}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";

    if (h >= 12) {
        h = h - 12;
        ampm = "PM";
    }

    h = h == 0 ? 12 : h;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    if (alarmTime === `${h}:${m} ${ampm}`) {
        ringtone.play();
        ringtone.loop = true;

        console.log("Alarm chalinmoqda!");
    }
}, 1000);

function setAlarm() {
    if (isAlarmSet) {
        alarmTime = "";
        ringtone.pause();
        ringtone.currentTime = 0;
        content.classList.remove("disable");
    setAlarmBtn.innerText = "Budilnik Qo'yish";
        isAlarmSet = false;
        return;
    }

    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        return alert("Iltimos, budilnik uchun to'g'ri vaqtni tanlang!");
    }

    alarmTime = time;
    content.classList.add("disable");
    setAlarmBtn.innerText = "Budilnikni tozalash";
    isAlarmSet = true;

    console.log(`Budilnik o'rnatildi: ${alarmTime}`);
}

setAlarmBtn.addEventListener("click", setAlarm);