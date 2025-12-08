import { useState } from 'react';

export const ToDoList = () => {

    const [cajaAuxiliar, setCajaAuxiliar] = useState('')
    const [listaTareas, setListaTareas] = useState([ ])

    return (
        <div className='container'>
            <ul>
                <li><input
                    onChange={(evento) => setCajaAuxiliar(evento.target.value)}
                    onKeyDown={(evento) => {
                        if (evento.key === 'Enter') {
                            if (cajaAuxiliar != '') {
                                setListaTareas([cajaAuxiliar, ...listaTareas])
                                evento.target.value = ''
                                setCajaAuxiliar('')
                            }
                        }
                    }}
                    type='text'
                    placeholder='Agrega tu tarea'>
                </input>
                </li>

                {
                    listaTareas.map((tarea) => {
                        return <p>{tarea}</p>
                    })
                }
            </ul>
        </div>
    );
}