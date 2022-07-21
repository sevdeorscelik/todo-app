import React, { useState, useEffect } from "react";

export default function Todo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [line, setLine] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("localTasks")) {
      const storedList = JSON.parse(localStorage.getItem("localTasks"));
      setTasks(storedList);
    }
  }, [])

  const addTask = (e) => {
    if (task) {
      const newTask = { id: new Date().getTime().toString(), title: task };
      setTasks([...tasks, newTask]);
      localStorage.setItem("localTasks", JSON.stringify([...tasks, newTask]));
      setTask("");
    }
  };

  const handleDelete = (task) => {
    const deleted = tasks.filter((t) => t.id !== task.id);
    setTasks(deleted);
    localStorage.setItem("localTasks", JSON.stringify(deleted))
  }
  const handleUnderline = (tesk) => {
    const underline = tasks.filter((t) => t.id !== task.id)
    line ? setLine(false) : setLine(underline)
  }

  const handleClear = () => {
    setTasks([]);
    localStorage.removeItem("localTasks");
  }
  return (
    <div className="Todos container row w-75  ">
      <h1 className="mt-3 mb-5 text-dark text-center">To-Do App</h1>
      <div className="col-8 ">
        <input
          name="task"
          type="text"
          value={task}
          placeholder="Write your task..."
          className="form-control "
          onChange={(e) => setTask(e.target.value)}
        />
      </div>
      <div className="col-4">
        <button
          className="btn btn-primary form-control material-icons "
          onClick={addTask}
        >
          add
        </button>
      </div>
      <div className="badge mt-5 fs-5 text-success">
        You have
        {!tasks.length
          ? " no tasks"
          : tasks.length === 1
            ? " 1 task"
            : tasks.length > 1
              ? ` ${tasks.length} tasks`
              : null}
      </div>
      {tasks.map((task) => (
        <div key={task.id} className="todo d-flex justify-content-center align-items-center">
          <div className="col-10 mt-2">
            <span className="form-control bg-white btn "
              style={{ textAlign: "left", fontWeight: "bold" , textDecoration:line ? 'none' : 'line-through'  }}>
              {task.title}
            </span>
          </div>

          <div className="col-1">
            <button
              className=" mt-2 btn btn-success material-icons"
              onClick={() => handleUnderline(task)}
            >check</button>
          </div>
          <div className="col-1">
            <button
              className=" mt-2 btn btn-danger material-icons"
              onClick={() => handleDelete(task)}
            >delete</button>
          </div>
        </div>
      ))}
      {!tasks.length ? null : (
        <div>
          <button className="btn btn-secondary  mt-4 mb-4" onClick={() => handleClear()}>
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
