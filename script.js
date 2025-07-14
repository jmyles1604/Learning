let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks(filter = "all") {
      const list = document.getElementById("taskList");
      list.innerHTML = "";

      tasks
        .filter(task => {
          if (filter === "active") return !task.done;
          if (filter === "completed") return task.done;
          return true;
        })
        .forEach((task, index) => {
          const li = document.createElement("li");
          li.className = task.done ? "completed" : "";
          li.innerHTML = `
            ${task.text}
            <span>
              <button onclick="toggleTask(${index})">✓</button>
              <button onclick="deleteTask(${index})">🗑</button>
            </span>
          `;
          list.appendChild(li);
        });
    }

    function addTask() {
      const input = document.getElementById("taskInput");
      const text = input.value.trim();
      if (text) {
        tasks.push({ text, done: false });
        saveTasks();
        renderTasks();
        input.value = "";
      }
    }

    function toggleTask(index) {
      tasks[index].done = !tasks[index].done;
      saveTasks();
      renderTasks();
    }

    function deleteTask(index) {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    }

    function filterTasks(type) {
      renderTasks(type);
    }

    renderTasks();
  renderTasks();