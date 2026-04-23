import { useState } from "react";

// Danh sách dữ liệu mẫu ban đầu
const DATA = [
  { id: "todo-0", name: "Eat", status: "Completed" },
  { id: "todo-1", name: "Sleep", status: "To do" },
  { id: "todo-2", name: "Repeat", status: "In process" },
];

function App() {
  const [tasks, setTasks] = useState(DATA);
  const [name, setName] = useState("");
  const [filter, setFilter] = useState("All");

  // --- HÀM XỬ LÝ LOGIC ---

  // Thêm task mới
  function addTask(e) {
    e.preventDefault();
    if (!name.trim()) return; // Chống chuỗi rỗng

    const newTask = {
      id: `todo-${Date.now()}`, // Tạo ID duy nhất bằng timestamp
      name: name,
      status: "To do", // Trạng thái mặc định khi thêm mới
    };
    setTasks([...tasks, newTask]);
    setName(""); // Reset ô input
  }

  // Xóa task
  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  // Sửa tên task (Thay đổi)
  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  // Cập nhật trạng thái (Chuyển đổi giữa 3 loại)
  function updateStatus(id, newStatus) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, status: newStatus };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  // --- LOGIC LỌC (FILTER) ---
  const taskList = tasks
    .filter((task) => {
      if (filter === "All") return true;
      return task.status === filter;
    })
    .map((task) => (
      <li className="todo stack-small" key={task.id}>
        <div className="c-cb">
          <input
            id={task.id}
            type="checkbox"
            checked={task.status === "Completed"}
            onChange={() => {
              const nextStatus =
                task.status === "Completed" ? "To do" : "Completed";
              updateStatus(task.id, nextStatus);
            }}
          />
          <label className="todo-label" htmlFor={task.id}>
            {task.name} <small style={{ color: "#666" }}>({task.status})</small>
          </label>
        </div>
        <div className="btn-group">
          {/* Nút thay đổi trạng thái nhanh sang In process */}
          <button
            type="button"
            className="btn"
            onClick={() => updateStatus(task.id, "In process")}
            disabled={task.status === "In process"}
          >
            In Process
          </button>

          <button
            type="button"
            className="btn"
            onClick={() => {
              const newName = prompt("Sửa tên công việc:", task.name);
              if (newName) editTask(task.id, newName);
            }}
          >
            Edit <span className="visually-hidden">{task.name}</span>
          </button>

          <button
            type="button"
            className="btn btn__danger"
            onClick={() => deleteTask(task.id)}
          >
            Delete <span className="visually-hidden">{task.name}</span>
          </button>
        </div>
      </li>
    ));

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <form onSubmit={addTask}>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>

      <div className="filters btn-group stack-exception">
        {["All", "To do", "In process", "Completed"].map((s) => (
          <button
            key={s}
            type="button"
            className="btn toggle-btn"
            aria-pressed={filter === s}
            onClick={() => setFilter(s)}
          >
            <span className="visually-hidden">Show </span>
            <span>{s}</span>
            <span className="visually-hidden"> tasks</span>
          </button>
        ))}
      </div>

      <h2 id="list-heading">{headingText}</h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
