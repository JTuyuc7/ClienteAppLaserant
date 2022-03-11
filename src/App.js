import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Formulario from './components/Formulario';
import TableData from './components/TableData';

const App = () => {

    return(
        <>
            <div className='container'>
                <BrowserRouter>

                    <Switch>
                        <Route path="/nuevo" >
                            <Formulario />
                        </Route>
                        <Route path="/editar/:codigo"  >
                            <Formulario />
                        </Route>
                        <Route path="/">
                            <TableData />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        </>
    )
}

export default App;