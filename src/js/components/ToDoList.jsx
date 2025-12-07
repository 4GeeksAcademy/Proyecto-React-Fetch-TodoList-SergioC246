import { useState } from 'react';


export const ToDoList = () => {
     
    const [ inputValue, setInputValue ] = useState('');



    return (
        <div className='container'>
            <ul>
                <li><input
                    type='text'
                    placeholder='Agrega tu tarea'>
                </input>
                </li>
                <li>Entender React</li>
                <li>Ir preparado a la mentoría con Facundo</li>
            </ul>
        </div>
    );
}