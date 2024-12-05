// Selecting DOM elements
const form = document.getElementById('log-form');
const logsDiv = document.getElementById('logs');

// Retrieve logs from localStorage or initialize as empty array
let logs = JSON.parse(localStorage.getItem('fitnessLogs')) || [];
displayLogs();

// Listen for form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get values from input fields
    const activityType = parseFloat(document.getElementById('activity-type').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const duration = parseFloat(document.getElementById('duration').value);

    // Calculate calories burned
    const timeInHours = duration / 60; // Convert minutes to hours
    const caloriesBurned = (activityType * weight * timeInHours).toFixed(2);

    // Create a log entry
    const log = {
        activity: document.getElementById('activity-type').options[document.getElementById('activity-type').selectedIndex].text,
        duration,
        calories: caloriesBurned,
    };

    // Add log to the logs array
    logs.push(log);

    // Save logs to localStorage
    localStorage.setItem('fitnessLogs', JSON.stringify(logs));

    // Display logs
    displayLogs();

    // Reset form
    form.reset();
});

// Function to display logs in the DOM
function displayLogs() {
    // Clear the logs section
    logsDiv.innerHTML = '<h2>Activity Logs</h2>';
    
    // Iterate through logs and add each log to the DOM
    logs.forEach((log, index) => {
        const logEntry = document.createElement('div');
        logEntry.classList.add('log-entry');
        logEntry.innerHTML = `
            <span>${log.activity}</span>
            <span>${log.duration} mins</span>
            <span>${log.calories} cal</span>
            <button onclick="deleteLog(${index})">Delete</button>
        `;
        logsDiv.appendChild(logEntry);
    });
}

// Function to delete a log entry
function deleteLog(index) {
    // Remove log from the logs array
    logs.splice(index, 1);

    // Save updated logs to localStorage
    localStorage.setItem('fitnessLogs', JSON.stringify(logs));

    // Re-render the logs
    displayLogs();
}
