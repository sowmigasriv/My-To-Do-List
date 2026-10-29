var textip = document.getElementById("textip");
var listcon = document.getElementById("list-container");
var addBtn = document.getElementById("add-btn");
var emptyMessage = document.getElementById("empty-message");

// Load saved tasks when the page opens
var tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];

// Add task on button click
addBtn.addEventListener("click", addList);

// Add task when Enter is pressed
textip.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addList();
    }
});

// Add a new task
function addList() {
    var taskText = textip.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    var newTask = {
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    displayTasks();

    textip.value = "";
    textip.focus();
}

// Save tasks in browser storage
function saveTasks() {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

// Display all saved tasks
function displayTasks() {
    listcon.innerHTML = "";

    tasks.forEach(function(item, index) {
        var listitem = document.createElement("li");

        if (item.completed) {
            listitem.classList.add("completed");
        }

        // Checkbox
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.completed;

        checkbox.addEventListener("change", function() {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            displayTasks();
        });

        // Task text
        var task = document.createElement("span");
        task.textContent = item.text;

        // Delete button
        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", function() {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });

        listitem.appendChild(checkbox);
        listitem.appendChild(task);
        listitem.appendChild(deleteBtn);

        listcon.appendChild(listitem);
    });

    updateMessage();
}

// Show message when no tasks exist
function updateMessage() {
    if (tasks.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }
}

// Show saved tasks when page loads
displayTasks();

