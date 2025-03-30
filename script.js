// Update clock display
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    // Update time
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
    
    // Update date
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[now.getDay()];
    const dayNumber = String(now.getDate()).padStart(2, '0');
    
    document.getElementById('dayName').textContent = dayName;
    document.getElementById('dayNumber').textContent = dayNumber;

    // Update days container
    const daysContainer = document.getElementById('daysContainer');
    if (daysContainer) {
        const currentDay = days[now.getDay()].toLowerCase();
        daysContainer.querySelectorAll('button').forEach(button => {
            if (button.dataset.day === currentDay) {
                button.classList.add('bg-sleep-orange', 'text-white');
                button.classList.remove('bg-gray-800', 'hover:bg-gray-700');
            } else {
                button.classList.remove('bg-sleep-orange', 'text-white');
                button.classList.add('bg-gray-800', 'hover:bg-gray-700');
            }
        });
    }
}

// Update clock every second
setInterval(updateClock, 1000);
updateClock(); // Initial call

// Simulate temperature update (in a real app, this would come from a sensor or API)
async function updateTemperature() {
    try {
        // Get user's location
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        // OpenWeatherMap API configuration
        const API_KEY = 'YOUR_API_KEY'; // Replace with your API key
        const { latitude, longitude } = position.coords;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;

        // Fetch temperature data
        const response = await fetch(url);
        const data = await response.json();
        const temp = Math.round(data.main.temp);

        // Update temperature display
        document.querySelector('.text-2xl.font-light').textContent = `${temp}°C`;
    } catch (error) {
        console.error('Error updating temperature:', error);
        // Fallback to a default temperature if there's an error
        document.querySelector('.text-2xl.font-light').textContent = '--°C';
    }
}

// Update temperature every 5 minutes
setInterval(updateTemperature, 300000);
updateTemperature(); // Initial call

// Todo List Functionality
const addTodoBtn = document.getElementById('addTodoBtn');
const newTodoInput = document.getElementById('newTodoInput');
const todoList = document.getElementById('todoList');

// Load todos from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Render todos
function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const todoItem = document.createElement('div');
        todoItem.className = `flex items-center justify-between bg-gray-800 rounded-lg px-3 py-2 ${todo.completed ? 'opacity-50' : ''}`;
        todoItem.innerHTML = `
            <div class="flex items-center gap-2">
                <input type="checkbox" ${todo.completed ? 'checked' : ''} class="rounded text-sleep-orange focus:ring-sleep-orange">
                <span class="${todo.completed ? 'line-through' : ''}">${todo.text}</span>
            </div>
            <button class="text-gray-400 hover:text-sleep-orange transition-colors">×</button>
        `;

        // Handle checkbox change
        const checkbox = todoItem.querySelector('input');
        checkbox.addEventListener('change', () => {
            todos[index].completed = checkbox.checked;
            localStorage.setItem('todos', JSON.stringify(todos));
            renderTodos();
        });

        // Handle delete
        const deleteBtn = todoItem.querySelector('button');
        deleteBtn.addEventListener('click', () => {
            todos.splice(index, 1);
            localStorage.setItem('todos', JSON.stringify(todos));
            renderTodos();
        });

        todoList.appendChild(todoItem);
    });
}

// Handle add todo
document.getElementById('addTodo').addEventListener('click', () => {
    newTodoInput.classList.toggle('hidden');
    if (!newTodoInput.classList.contains('hidden')) {
        newTodoInput.focus();
    }
});

newTodoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && newTodoInput.value.trim()) {
        todos.push({
            text: newTodoInput.value.trim(),
            completed: false
        });
        localStorage.setItem('todos', JSON.stringify(todos));
        newTodoInput.value = '';
        newTodoInput.classList.add('hidden');
        renderTodos();
    }
});

// Initial render
renderTodos();


// Username handling
function initializeUsername() {
    const usernameElement = document.getElementById('username');
    const storedUsername = localStorage.getItem('username') || 'User';
    usernameElement.textContent = storedUsername;

    usernameElement.addEventListener('click', () => {
        const newUsername = prompt('Enter your name:', storedUsername);
        if (newUsername && newUsername.trim()) {
            localStorage.setItem('username', newUsername.trim());
            usernameElement.textContent = newUsername.trim();
        }
    });
}

// Initialize username when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeUsername();
    initializeNetworkStatus();
});

// Network status handling
function initializeNetworkStatus() {
    const networkIcons = document.querySelectorAll('svg');
    const wifiIcon = networkIcons[0];
    const networkIcon = networkIcons[1];

    function updateNetworkStatus() {
        if (navigator.onLine) {
            wifiIcon.style.opacity = '1';
            networkIcon.style.opacity = '1';
            wifiIcon.style.color = '#ff4d00';
            networkIcon.style.color = '#ff4d00';
        } else {
            wifiIcon.style.opacity = '0.5';
            networkIcon.style.opacity = '0.5';
            wifiIcon.style.color = 'currentColor';
            networkIcon.style.color = 'currentColor';
        }
    }

    // Add event listeners for online/offline events
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);

    // Initial status check
    updateNetworkStatus();
}
