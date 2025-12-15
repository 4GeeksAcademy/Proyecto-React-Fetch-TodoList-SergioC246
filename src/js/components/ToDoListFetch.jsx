import { useEffect, useState } from "react"


export const ToDoListFetch = () => {
  const baseURL = 'https://playground.4geeks.com/todo';
  const user = 'spain-124';

  const [newTask, setNewTask] = useState('');
  const [editTask, setEditTask] = useState('');
  const [editCompleted, setEditCompleted] = useState('');
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const handleNewTask = event => setNewTask(event.target.value);
  const handleEditTask = event => setEditTask(event.target.value);
  const handleEditCompleted = event => setEditCompleted(event.target.checked);

  const handleEdit = (tareaAModificar) => {
    setIsEdit(true)
    setEditTodo(tareaAModificar)
    setEditTask(tareaAModificar.label)
    setEditCompleted(tareaAModificar.is_done)
  }

  const handleDelete = () => {
    console.log('click en delete')
  }

  const handleSubmitAdd = async (event) => {
    event.preventDefault()
    const dataToSend = {
      label: newTask,
      is_done: false, 
    }
    const uri = `${baseURL}/todos/${user}`
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    }
    const response = await fetch(uri, options)
    if (!response.ok) {
      return
    }
    const data = await response.json()
    setNewTask('')
    getTodos()
  }

  const handleSubmitEdit = async (event) => {
    event.preventDefault()
    const dataToSend = {
      label: editTask,
      is_done: editCompleted,
    }
    const uri = `${baseURL}/todos/${editTodo.id}`
    const options = {

    }
    const response = await fetch(uri, options)
    if (!response.ok) {
      return
    }
    const data = await response.json()

  }

  const getTodos = async () => {
    const uri = `${baseURL}/users/${user}`
    const options = {
      methods: 'GET'
    }
    const response = await fetch(uri, options)
    if (!response.ok) {
      return
    }
    const data = await response.json();
    return (data)
  }

  useEffect(() => {
    getTodos
  }, [])

  return (
    <div className="container my-3">
      <h1 className="text-primary text-center">Tareas por hacer con React y Fetch</h1>

      { isEdit ?
        <form onSubmit={handleSubmitEdit}>
          {/* Form Editar Tarea */}
          <div className="text-start mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Edit Task</label>
            <input type="text" className="form-control" id="exampleInputPassword1"
              value={editTask} onChange={handleEditTask} />
          </div>
          <div className="text-start mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"
              checked={editCompleted} onChange={handleEditCompleted} />
            <label className="form-check-label" htmlFor="exampleCheck1">Completed</label>
          </div>
          <button type="submit" className="btn btn-primary me-2">Submit</button>
          <button type="reset" className="btn btn-secondary">Reset</button>
        </form>
      :
        <form onSubmit={handleSubmitAdd}>
          {/* Form Agregar Tarea */}
          <div className="text-start mb-3">
            <label htmlFor="exampleTask" className="form-label">Add Task</label>
            <input type="text" className="form-control" id="exampleTask"
              value={newTask} onChange={handleNewTask} />
          </div>
        </form>
      }


      <hr className="my-1" />
      <h2 className="text-primary mt-3">List</h2>

      {/* UL con listados */}
      <ul className="text-start list-group">
        {todos.map((item) =>
          <li key={item.id}
            className="list-group-item hidden-icon d-flex justify-content-between">
            <div>
              {item.is_done ?
              <i className="far fa-thumbs-up text-success me-2"></i>
              :
              <i className="fas fa-times-circle text-danger me-2"></i>
              }             
              {item.label}
            </div>
            <div>
              <span onClick={() => handleEdit(item)}>
                <i className="fas fa-edit text-primary me-2"></i>
              </span>

              <span onClick={handleDelete}>
                <i className="fas fa-trash text-danger"></i>
              </span>
            </div>
          </li>
        )}
        <li className="list-group-item text-end">{
          todos.length == 0 ?
            'No task, please add a new task'
            :
            todos.length + ' tasks'}
        </li>
      </ul>

    </div>
  );
}