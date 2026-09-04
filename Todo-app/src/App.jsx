import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | completed

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleAdd() {
    setTodos([...todos, { text: text, done: false }]);
    setText("");
  }

  function handleDelete(index) {
    setTodos(todos.filter((item, i) => i !== index));
  }

  function handleToggle(index) {
    setTodos(
      todos.map((item, i) => (i === index ? { ...item, done: !item.done } : item))
    );
  }

  // derived value — recalculated every render based on current filter
  const filteredTodos = todos.filter((item) => {
    if (filter === "active") return !item.done;
    if (filter === "completed") return item.done;
    return true; // "all"
  });

  return (
    <div className="App">
      <h1>Todo List</h1>

      <input
        type="text"
        placeholder="add a todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>

      {/* filter buttons */}
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      <ul>
        {filteredTodos.map((item, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => handleToggle(index)}
            />
            <span style={{ textDecoration: item.done ? "line-through" : "none" }}>
              {item.text}
            </span>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;