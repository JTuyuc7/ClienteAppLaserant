import React from 'react';
import './App.css';
import Formulario from './components/Formulario';
import TableData from './components/TableData';

const App = () => {

    return(
        <>
            <div className='container'>
                <Formulario />

                <TableData />
            </div>
        </>
    )
}

export default App;