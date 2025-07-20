let taskCount = 0, goalCount = 0;
let timerInterval;
let time = 1500;

document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Load notes from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedNotes = localStorage.getItem('copilot-notes');
  if (savedNotes) {
    document.getElementById('note-box').value = savedNotes;
  }
});

function addTask() {
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');
  if (taskInput.value) {
    const li = document.createElement('li');
    li.textContent = taskInput.value;
    li.onclick = function() { // Delete on click
      li.remove();
      taskCount--;
      document.getElementById('task-count').textContent = taskCount;
    };
    taskList.appendChild(li);
    taskInput.value = '';
    taskCount++;
    document.getElementById('task-count').textContent = taskCount;
  }
}

function addGoal() {
  const goalInput = document.getElementById('goal-input');
  const goalList = document.getElementById('goal-list');
  if (goalInput.value) {
    const li = document.createElement('li');
    li.textContent = goalInput.value;
    li.onclick = function() { // Delete on click
      li.remove();
      goalCount--;
      document.getElementById('goal-count').textContent = goalCount;
    };
    goalList.appendChild(li);
    goalInput.value = '';
    goalCount++;
    document.getElementById('goal-count').textContent = goalCount;
  }
}

function saveNotes() {
  const notes = document.getElementById('note-box').value;
  localStorage.setItem('copilot-notes', notes);
}

function addEvent() {
  const date = document.getElementById('event-date').value;
  const desc = document.getElementById('event-desc').value;
  const eventList = document.getElementById('event-list');
  if (date && desc) {
    const li = document.createElement('li');
    li.textContent = `${date}: ${desc}`;
    li.onclick = function() { // Delete on click
      li.remove();
    };
    eventList.appendChild(li);
  }
}

function startTimer() {
  if (timerInterval) return; // Prevent multiple timers
  timerInterval = setInterval(() => {
    if (time > 0) {
      time--;
      const mins = String(Math.floor(time / 60)).padStart(2, '0');
      const secs = String(time % 60).padStart(2, '0');
      document.getElementById('timer').textContent = `${mins}:${secs}`;
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      alert("Pomodoro finished!");
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  time = 1500;
  document.getElementById('timer').textContent ="25:00";
}  