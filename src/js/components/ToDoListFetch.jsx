import { useEffect, useState } from "react"


export const ToDoListFetch = () => {
  const baseURL = 'https://playground.4geeks.com/todo';
  const user = 'Sergio';

  const [newTask, setNewTask] = useState('');
  const [editTask, setEditTask] = useState('');  
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const handleNewTask = (event) => setNewTask(event.target.value);
  const handleEditTask = (event) => setEditTask(event.target.value);  

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
        is_done: editTodo.is_done,
      }),
    };
    const response = await fetch(uri, options);
    if (!response.ok) return;

    setIsEdit(false);
    getTodos();
  };

  const handleDelete = async (id) => {
    const uri = `${baseURL}/todos/${id}`;
    const options = {
      method: 'DELETE',
    };

    const response = await fetch(uri, options);
    if (!response.ok) return;

    getTodos();
  };

  const toggleTaskDone = async (todo) => {
    const uri = `${baseURL}/todos/${todo.id}`;
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        label: todo.label,
        is_done: !todo.is_done,
      }),
    };

    const response = await fetch(uri, options);
    if (!response.ok) return;

    getTodos();
  };

  const handleClearAll = async () => {
    const deleteUri = `${baseURL}/users/${user}`;
    const createUri = `${baseURL}/users/${user}`;

    await fetch(deleteUri, {method: 'DELETE'});

    await fetch(createUri, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify([]),
    });

    getTodos();
  };

  const handleEdit = (todo) => {
    setIsEdit(true)
    setEditTodo(todo)
    setEditTask(todo.label)    
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
            <label className="form-label">Agrega la tarea</label>
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
      <h2 className="text-primary mt-3">Lista de tareas pendientes</h2>

      
      <ul className="text-start list-group">
        {todos.map((item) => (
          <li
            key={item.id}
            className="list-group-item hidden-icon d-flex justify-content-between">
            
            <div
              style={{ cursor: 'pointer'}}
              onClick={() => toggleTaskDone(item)}
            > 
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
                onClick={() => handleDelete(item.id)}
                ></i>
            </span>            
          </li>
        ))}


        <li className="list-group-item text-end">{
          todos.length == 0 
          ? 'No hay tareas, por favor agrega tareas por hacer'
          : todos.length + ' tareas'}
        </li>
      </ul>

      <button 
        className="btn btn-danger mt-3" 
        onClick={handleClearAll}
      >
        Limpiar todas las tareas
      </button>
    </div>
  );
};