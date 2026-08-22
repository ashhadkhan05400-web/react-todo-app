import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [input, setInput] = useState("")
  const [editId, setEditId] = useState(null)
  const [task, setTask] = useState([])
  const notify = (message) => toast(message);
  const deletebtn = (id) => {
    setTask(task.filter((t) => t.id !== id))
  }
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'short'
  })
  const editbtn = (t) => {
    setInput(t.text)
    setEditId(t.id)
  }
  const toggleComplete = (id) => {
    setTask(task.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ))
  }
 const completedCount = task.filter((t) => t.completed).length
 const percent = task.length === 0 ? 0 : Math.round((completedCount / task.length) * 100)
  const deleteall = () => {

    if (task.length == 0) {
      notify("Add some task first")
    }

    setTask([])
  }
  const submitbtn = (e) => {
    e.preventDefault();

    if (input.trim() === "") {
      notify("Type a task first then add it")
      return
    }



    if (editId) {
      setTask(task.map((t) => t.id === editId ? { ...t, text: input } : t))
      setEditId(null)
    }

    else {
      const newtask = {
        id: Date.now(),
        text: input,
        completed: false,
      }
      setTask([...task, newtask])
    }
    setInput("")

  }

  return (
    <>
      <ToastContainer />
      <div className="app">

        <div className="app-header">
          <div>
            <h1>Today</h1>
            <span id="current-date">{today}</span>
          </div>
          <div className="progress-ring-wrap">
            <svg width="44" height="44" viewBox="0 0 44 44">
              <circle className="progress-ring-bg" cx="22" cy="22" r="18" />
              <circle
                className="progress-ring-fill"
                cx="22" cy="22" r="18"
                style={{ strokeDashoffset: 113 - (113 * percent) / 100 }}
              />
            </svg>
            <span id="progress-percent">{percent}%</span>
          </div>
        </div>

        <div className="card">

          {/* JS: onSubmit here to add a task */}
          <form id="todo-form" onSubmit={submitbtn}>
            <input value={input} type="text" id="todo-input" placeholder="Add a task..." autoComplete="off" onChange={(e) => setInput(e.target.value)} />
            <button type="submit" id="add-btn">{editId ? "✓" : "+"}</button>
          </form>


          <ul id="todo-list">
            {task.length === 0 ? (
              <li className="empty-state" id="empty-state">
                <span></span>
                Nothing here yet add your first task
              </li>
            ) : (
              task.map((tasks) => (
                <li className="todo-item" key={tasks.id}>
                  <input type="checkbox" className="todo-checkbox" checked={tasks.completed} onChange={() => toggleComplete(tasks.id)} />
                  <span className={`todo-text ${tasks.completed ? "completed" : ""}`}>
                    {tasks.text}
                  </span>
                  <button onClick={() => editbtn(tasks)} className="edit-btn">✎</button>
                  <button onClick={() => deletebtn(tasks.id)} className="delete-btn">✕</button>
                </li>
              ))
            )

            }
          </ul>

          <div className="list-footer">
            <span id="items-left">{task.length} task left</span>
            <button onClick={deleteall} id="clear-completed">Delete all</button>
          </div>

        </div>
      </div >
    </>
  )
}

export default App
