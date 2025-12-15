import { useEffect, useState } from "react"


export const ToDoListFetch = () => {
  const baseURL = 'https://playground.4geeks.com/todo';
  const user = 'Sergio';

  const [newTask, setNewTask] = useState('');
  const [editTask, setEditTask] = useState('');
  const [editCompleted, setEditCompleted] = useState(false);
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const handleNewTask = (event) => setNewTask(event.target.value);
  const handleEditTask = (event) => setEditTask(event.target.value);
  const handleEditCompleted = (event) => setEditCompleted(event.target.checked);

  /* API functions */

  const createUser = async () => {
    const uri = `${baseURL}/users/${user}`;
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify([]),
    };

    await fetch(uri, options);
  };


  const getTodos = async () => {
    const uri = `${baseURL}/users/${user}`;
    const response = await fetch(uri);
    if (!response.ok) return;

    const data = await response.json();
    setTodos(data.todos);
  };

  /* Eventos o handlers */

  const handleSubmitAdd = async (event) => {
    event.preventDefault();
    const uri = `${baseURL}/todos/${user}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        label: newTask,
        is_done: false,
      }),
    };
    const response = await fetch(uri, options)
    if (!response.ok) return;

    setNewTask('');
    getTodos();
  };

  const handleSubmitEdit = async (event) => {
    event.preventDefault()
    const uri = `${baseURL}/todos/${editTodo.id}`
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        label: editTask,
        is_done: editCompleted,
      }),
    };
    const response = await fetch(uri, options);
    if (!response.ok) return;

    setIsEdit(false);
    getTodos();
  };

  const handleDelete = async (id) => {
    const uri = `${baseURL}/todos${id}`;
    const options = {
      method: 'DELETE',
    };

    const response = await fetch(uri, options);
    if (!response.ok) return;

    getTodos();
  };

  const handleClearAll = async () => {
    const uri = `${baseURL}/users/${user}`;
    const options = {
      method: 'PUT',
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify([]),
    };

    await fetch(uri, options);
    setTodos([]);
  };

  const handleEdit = (todo) => {
    setIsEdit(true)
    setEditTodo(todo)
    setEditTask(todo.label)
    setEditCompleted(todo.is_done)
  };


  useEffect(() => {
    createUser();
    getTodos();
  }, []);

  return (
    <div className="container my-3">
      <h1 className="text-primary text-center">
        Tareas por hacer con React y Fetch
      </h1>

      {isEdit ? (
        <form onSubmit={handleSubmitEdit}>
          <div className="text-start mb-3">
            <label className="form-label">Edit Task</label>
            <input
              type="text"
              className="form-control"
              value={editTask}
              onChange={handleEditTask}
            />
          </div>

          <div className="text-start mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={editCompleted}
              onChange={handleEditCompleted}
            />
            <label className="form-check-label">Completed</label>
          </div>

          <button type="submit" className="btn btn-primary me-2">
            Submit
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setIsEdit(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmitAdd}>
          <div className="text-start mb-3">
            <label className="form-label">Add Task</label>
            <input
              type="text"
              className="form-control"
              value={newTask}
              onChange={handleNewTask}
            />
          </div>
        </form>
      )}

      <hr className="my-1" />
      <h2 className="text-primary mt-3">List</h2>

      
      <ul className="text-start list-group">
        {todos.map((item) => (
          <li
            key={item.id}
            className="list-group-item hidden-icon d-flex justify-content-between">
            
            <div> 
              {item.is_done ?
                <i className="far fa-thumbs-up text-success me-2"></i>
                :
                <i className="fas fa-times-circle text-danger me-2"></i>
              }
              {item.label}
            </div>
            
            <span>
                <i className="fas fa-edit text-primary me-3"
                onClick={() => handleEdit(item)}
                ></i>
                <i className="fas fa-trash text-danger"
                onClick={() => handleDelete(item)}
                ></i>
            </span>            
          </li>
        ))}


        <li className="list-group-item text-end">{
          todos.length == 0 
          ? 'No task, please add a new task'
          : todos.length + ' tasks'}
        </li>
      </ul>

      <button className="btn btn-danger mt-3 onClick={handleClearAll}">
        Clear all tasks
      </button>
    </div>
  );
};