import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (task.trim() === "") return;

    const newTask = {
      id: Date.now(),
      title: task,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  const toggleTask = (id) => {
    setTasks(
        tasks.map((item) =>
            item.id === id
                ? { ...item, completed: !item.completed }
                : item
        )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const completedCount = tasks.filter((item) => item.completed).length;
  const filteredTasks = tasks.filter((item) => {
    if (filter === "completed") return item.completed;
    if (filter === "pending") return !item.completed;
    return true;
  });

  return (
      <div className="app">
        <div className="container">
          <h1>Student Task Manager</h1>
          <p className="subtitle">
            Organize your academic tasks in one place
          </p>

          <div className="task-form">
            <input
                type="text"
                placeholder="Enter a new task..."
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
            />

            <button onClick={addTask}>Add Task</button>
          </div>

          <div className="stats">
            <div>
              <h2>{tasks.length}</h2>
              <p>Total Tasks</p>
            </div>

            <div>
              <h2>{completedCount}</h2>
              <p>Completed</p>
            </div>

            <div>
              <h2>{tasks.length - completedCount}</h2>
              <p>Pending</p>
            </div>
          </div>
          <div className="filters">
            <button
                className={filter === "all" ? "active" : ""}
                onClick={() => setFilter("all")}
            >
              All
            </button>

            <button
                className={filter === "pending" ? "active" : ""}
                onClick={() => setFilter("pending")}
            >
              Pending
            </button>

            <button
                className={filter === "completed" ? "active" : ""}
                onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>
          <div className="task-list">
            {tasks.length === 0 ? (
                <p className="empty">No tasks added yet.</p>
            ) : (
                filteredTasks.map((item) => (
                    <div
                        className={`task-item ${
                            item.completed ? "completed" : ""
                        }`}
                        key={item.id}
                    >
                      <span>{item.title}</span>

                      <div className="actions">
                        <button
                            className="complete-btn"
                            onClick={() => toggleTask(item.id)}
                        >
                          {item.completed ? "Undo" : "Complete"}
                        </button>

                        <button
                            className="delete-btn"
                            onClick={() => deleteTask(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                ))
            )}
          </div>
        </div>
      </div>
  );
}

export default App;