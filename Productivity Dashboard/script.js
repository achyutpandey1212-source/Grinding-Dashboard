let allElems = document.querySelectorAll(".card");
let fullElems = document.querySelectorAll(".fullElems");
let closeBtn = document.querySelectorAll(".fullElems .close");
let temp = document.querySelector("#temp");
let loctn = document.querySelector("#loctn");
let time = document.querySelector("#time");
let day = document.querySelector("#day");
let date1 = document.querySelector("#date");
let weather = document.getElementsByClassName("weather");

function openFeatures() {
  allElems.forEach(function (elem) {
    elem.addEventListener("click", function () {
      fullElems[elem.id].style.display = "block";
    });

    closeBtn[elem.id].addEventListener("click", function () {
      fullElems[elem.id].style.display = "none";
    });
  });
}

openFeatures();

//---------------------------------------------------------

// SECTION: WEATHER

// WEATHER API FETCH

async function getWeather(city) {
  let apikey = `a881cc88720150242ba63bc0c9c8c0ad`;

  try {
    let raw = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`,
    );

    if (!raw.ok) {
      throw new Error(`${city} not found...`);
    }

    let data = await raw.json();
    let finTemp = Math.round(data.main.temp);

    temp.innerHTML = `${finTemp}°C`;
    loctn.innerHTML = `${city}`;
  } catch (err) {
    console.log(err.message);
  }
}

getWeather("Delhi");
//---------------------------------------------------------

// SECTION: CLOCK

function updateClock() {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let date = new Date();
  let currDate = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  let hh = String(hours).padStart(2, "0");
  let mm = String(minutes).padStart(2, "0");
  let ss = String(seconds).padStart(2, "0");
  let dd = String(currDate).padStart(2, "0");

  time.innerHTML = `${hh}:${mm}:${ss}`;
  day.innerHTML = `${weekdays[date.getDay()]},`;
  date1.innerHTML = `${dd} ${month[date.getMonth()]} ${date.getFullYear()}`;
}

setTimeout(() => {
  setInterval(() => {
    updateClock();
  }, 1000);
}, 2);

//---------------------------------------------------------

// TODO LIST

function todoList() {
  let form = document.querySelector(".task-container .left .form");
  let taskInput = document.querySelector(
    ".task-container .left .form #taskInput",
  );
  let taskDetailsInput = document.querySelector(
    ".task-container .left .form #textArea",
  );

  let check = document.querySelector(
    ".task-container .left .form .check #checkbox",
  );

  let currentTasks = [];

  if (localStorage.getItem("currentTasks")) {
    currentTasks = JSON.parse(localStorage.getItem("currentTasks"));
  } else {
    console.log("Task list is Empty");
  }

  function renderTask() {
    let allTasks = document.querySelector(".right-tasklist");

    let sum = "";

    currentTasks.forEach((elem) => {
      sum += `<div class="box">
                      <h2>${elem.input}<span class="${elem.imp}">Imp</span></h2>
                      <div><button class="markbtn">Mark as completed</button>
                      <button class="delbtn">Delete Task</button></div>    
                  </div>`;
    });

    allTasks.innerHTML = sum;

    let markBtn = document.querySelectorAll(".right-tasklist .box .markbtn");
    markBtn.forEach((e) => {
      e.addEventListener("click", () => {
        if (e.style.backgroundColor === "crimson") {
          e.style.backgroundColor = "green";
          e.innerHTML = "Completed";
        } else {
          e.style.backgroundColor = "crimson";
          e.innerHTML = "Mark as completed";
        }
      });
    });

    localStorage.setItem("currentTasks", JSON.stringify(currentTasks));

    document
      .querySelectorAll(".right-tasklist .box .delbtn")
      .forEach(function (btn) {
        btn.addEventListener("click", function () {
          currentTasks.splice(btn.id, 1);
          renderTask();
        });
      });
  }

  renderTask();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    currentTasks.push({
      input: taskInput.value,
      details: taskDetailsInput.value,
      imp: check.checked,
    });

    renderTask();

    check.checked = false;
    taskInput.value = "";
    taskDetailsInput.value = "";
  });
}

todoList();

//---------------------------------------------------------

// DAILY PLANNER

function dailyPlanner() {
  let dayPlanner = document.querySelector(".daily-planner");
  let hours = Array.from({ length: 20 }, (_, idx) => {
    return `${4 + idx}:00 - ${5 + idx}:00`;
  });

  let dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};

  let sum = "";

  hours.forEach((e, idx) => {
    let savedData = dayPlanData[idx] || "";
    sum += `<div class="box">
            <p>${e}</p>
            <input id="${idx}" type="text" placeholder="..." value='${savedData}'>
          </div>`;
  });

  dayPlanner.innerHTML = sum;

  let dayPlannerInput = document.querySelectorAll(".daily-planner .box input");

  dayPlannerInput.forEach((elm) => {
    elm.addEventListener("input", () => {
      dayPlanData[elm.id] = elm.value;

      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}

dailyPlanner();

//-----------------------------------------------------
// MOTIVATIONAL QUOTES

async function getQuotes() {
  try {
    let response = await fetch("https://thequoteshub.com/api/");

    if (!response.ok) {
      throw new Error("There is some Technical Glitch from our side.");
    }

    let data = await response.json();

    let quote = data.text;
    let author = data.author;

    let quoteData = document.querySelector(".motivationPage h1");
    let authorData = document.querySelector(".motivationPage p");
    let quoteContainer = document.querySelector(".motivationPage .data");
    sum = "";

    function renderQuote() {
      sum += `<div class="data">
            <h1>${quote}</h1>
            <p>-${author}</p>
          </div>`;
    }
    renderQuote();
    quoteContainer.innerHTML = sum;
  } catch (error) {
    console.log(error);
  }
}

getQuotes();

//---------------------------------------------------

// POMODORO-TIMER

function pomodoroTimer() {
  let startBtn = document.querySelector(
    ".pomo-container .bottom-btn .start-timer",
  );
  let pauseBtn = document.querySelector(
    ".pomo-container .bottom-btn .pause-timer",
  );
  let resetBtn = document.querySelector(
    ".pomo-container .bottom-btn .reset-timer",
  );

  let state = document.querySelector(".pomo-container #state");
  let timer = document.querySelector(".pomo-container h1");
  let timerInterval = null;
  let totSeconds = 25 * 60;
  let isWorkSession = true;

  function updateTimer() {
    let minutes = Math.floor(totSeconds / 60);
    let seconds = Math.floor(totSeconds % 60);

    timer.innerHTML = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function startTimer() {
    if (isWorkSession) {
      state.innerHTML = "Work Session";
      state.style.backgroundColor = "rgb(222, 120, 5)";
      state.style.boxShadow = "2px 3px 0px rgb(222, 120, 5)";
      clearInterval(timerInterval);
      timerInterval = setInterval(() => {
        if (totSeconds > 0) {
          totSeconds--;
          updateTimer();
        } else {
          isWorkSession = false;
          clearInterval(timerInterval);
          setTimeout(() => {
            timer.innerHTML = "05:00";
            state.innerHTML = "Break";
            state.style.backgroundColor = "rgb(8, 254, 201)";
            state.style.boxShadow = "2px 3px 0px rgb(8, 254, 201)";
          }, 100);
        }
      }, 1000);
    } else {
      totSeconds = 5 * 60;
      timerInterval = setInterval(() => {
        if (totSeconds > 0) {
          totSeconds--;
          updateTimer();
        } else {
          isWorkSession = true;
          clearInterval(timerInterval);
          totSeconds = 25 * 60;
          setTimeout(() => {
            timer.innerHTML = "25:00";
            state.innerHTML = "Work Session";
            state.style.backgroundColor = "rgb(222, 120, 5)";
            state.style.boxShadow = "2px 3px 0px rgb(222, 120, 5)";
          }, 100);
        }
      }, 10);
    }
  }

  function pauseTimer() {
    clearInterval(timerInterval);
    state.innerHTML = "TIMER PAUSED";
    state.style.backgroundColor = "yellow";
    state.style.boxShadow = "2px 3px 0px yellow";
  }

  function resetTimer() {
    totSeconds = 25 * 60;
    clearInterval(timerInterval);
    state.innerHTML = "TIMER RESET";
    state.style.backgroundColor = "pink";
    state.style.boxShadow = "2px 3px 0px pink";
    updateTimer();
  }

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
}

pomodoroTimer();

//---------------------------------------------------------

// DAILY GOALS SETTER

function dailyGoals() {
  let dataContainer = document.querySelector(".data-container");
  let inpText = document.querySelector(".task-adder #text");
  let addBtn = document.querySelector(".task-adder .add");
  let goalsArr = JSON.parse(localStorage.getItem("goalsArr")) || [];

  // ---- STATUS ELEMENTS ----
  const statusBoxes = document.querySelectorAll(".status .top-box");
  const totalElem     = statusBoxes[0].querySelector(".div:nth-child(2)");
  const completedElem = statusBoxes[1].querySelector(".div:nth-child(2)");
  const remainingElem = statusBoxes[2].querySelector(".div:nth-child(2)");

  function saveGoals() {
    localStorage.setItem("goalsArr", JSON.stringify(goalsArr));
  }

  function updateStatus() {
    const total = goalsArr.length;
    const completed = goalsArr.filter(g => g.completed).length;
    const remaining = total - completed;

    totalElem.textContent = total;
    completedElem.textContent = completed;
    remainingElem.textContent = remaining;
  }

  function addGoal() {
    let goalText = inpText.value.trim();
    if (!goalText) return;

    goalsArr.push({ text: goalText, completed: false });
    saveGoals();
    inpText.value = "";
    renderGoals();
  }

  function toggleComplete(index) {
    goalsArr[index].completed = !goalsArr[index].completed;
    saveGoals();
    renderGoals();
  }

  function deleteGoal(index) {
    goalsArr.splice(index, 1);
    saveGoals();
    renderGoals();
  }

  function renderGoals() {
    let sum = "";
    goalsArr.forEach((goalData, idx) => {
      let style = goalData.completed
        ? "text-decoration: line-through; opacity: 0.6;"
        : "";
      sum += `<div class="goal-card" data-index="${idx}">
        <input type="checkbox" class="goal-cb" ${goalData.completed ? "checked" : ""} />
        <h1 style="${style}">${goalData.text}</h1>
        <button class="cross" data-index="${idx}"><i class="ri-close-line"></i></button>
      </div>`;
    });
    dataContainer.innerHTML = sum;


    document.querySelectorAll(".goal-cb").forEach(cb => {
      cb.addEventListener("change", (e) => {
        const index = e.target.closest(".goal-card").dataset.index;
        toggleComplete(index);
      });
    });

    document.querySelectorAll(".cross").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const index = e.currentTarget.dataset.index;
        deleteGoal(index);
      });
    });

    updateStatus();
  }

  addBtn.addEventListener("click", addGoal);
  inpText.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addGoal();
  });


  renderGoals();
}

dailyGoals();



//----------------------------------------------------------------


function themeManager() {
  const themeIcon = document.querySelector("nav .ri-sun-line");
  const THEME_COUNT = 4; 


  let currentTheme = parseInt(localStorage.getItem("themeIndex") || "0", 10);

  function applyTheme(index) {
    document.body.setAttribute("data-theme", index);   
    localStorage.setItem("themeIndex", index);
  }

  applyTheme(currentTheme);


  themeIcon.addEventListener("click", () => {
    currentTheme = (currentTheme + 1) % THEME_COUNT;
    applyTheme(currentTheme);
  });
}


themeManager();
