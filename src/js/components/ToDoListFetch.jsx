import { useEffect, useState } from "react"


export const ToDoListFetch = () => {
  const host = 'https://jsonplaceholder.typicode.com' // Este es el Host. La API principal desde donde se toman los datos
  const [ users, setUSers ] = useState([])

  const getUsers = async () => {
    // 1. defino la url de la api
    const uri = `${host}/users` // Simpre va a ser un string. Está tomando la información de la API y nos está diciendo haciando ir luego del /
    // 2. defino las options del request (petición)
    const options = { // Esto va a ser siempre un objeto
      methods: 'GET'
    }   
    // 3. realizo la petición (estoy haciendo el metodo fetch. OJO: si no queda claro revisar el Postman de la URL)
    const response = await fetch(uri, options)  // Fetch tiene dos parametros, la url y las opciones
    // 4. Evalúo si la petición fue exitosa ? (del response)
    if (!response.ok) {
      // 4.1 Si tengo un error, entonces trato ese error
      return
    }
    // 5. Si no tengo error, extraigo la información (json) de la respuesta (response)
    const data = await response.json()
    // 6. Hago algo con los datos .....
    setUSers(data)    
  }

  useEffect(() => {
    getUsers()
  })
  
  return (
    <div className="container my-3 text-start">
      <div className="row">
        <div className="col-10 col-sm-8 col-md-6 m-auto">
          <h1 className="text-primary text-center">Tareas por hacer con React y Fetch</h1>
          <ul className="list-group">
            {users.map((item) =>
              <li className="list-group-item">{item.name}</li>
            )}            
          </ul>
        </div>
      </div>
    </div>
  );
}