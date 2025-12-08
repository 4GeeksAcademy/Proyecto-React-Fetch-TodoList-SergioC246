import { useState } from 'react';


export const ToDoList = () => {
     
    const [ cajaAuxiliar, setCajaAuxiliar ] = useState('')
    const [ listaTareas, setListaTareas ] = useState(['Ir preparado a la mentoría con Facundo' , 'Entender React'])




    return (
        <div className='container'>
            <ul>
                <li><input 
                    onChange={(evento) => setCajaAuxiliar(evento.target.value)}
                    onKeyDown={(evento) => {
                        if (evento.key === 'Enter') {
                            console.log('Acabas de presionar el enter')
                        }
                    }}
                    type='text'
                    placeholder='Agrega tu tarea'>
                </input>
                </li>              
            </ul>
            <p>El valor de cajaAuxiliar es: {cajaAuxiliar}</p>
        </div>
    );
}