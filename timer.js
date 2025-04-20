let totalTime = 20 * 60; // Total time in seconds (20 minutes)

function startTimer() {
  const timerElement2 = document.getElementById("timer");

  const interval = setInterval(() => {
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;
    timerElement2.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (totalTime <= 0) {
      clearInterval(interval); // Stop the timer
      alert("Time's up!");
    }

    totalTime--; // Reduce the time by 1 second
  }, 1000); // Execute every 1 second
}

window.addEventListener("load", function () {
  startTimer();
});

// ...............................................................

let timerInterval;

function startTimer2() {
  const display1 = document.getElementById("timerdisplay");
  let seconds = 0; // Start from 0

  timerInterval = setInterval(function () {
    seconds++;
    const minutes = Math.floor(seconds / 60);
    const formattedSeconds = seconds % 60;

    // Display time in mm:ss format
    display1.textContent = 
      String(minutes).padStart(2, "0") + ":" + 
      String(formattedSeconds).padStart(2, "0");
  }, 1000);
}

window.addEventListener("load", function () {
  startTimer2();
});