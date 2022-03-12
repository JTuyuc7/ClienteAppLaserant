import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../src/store/index';
import Formulario from './components/Formulario';
import TableData from './components/TableData';

const App = () => {

    return(
        <>
            <div className='container'>
                <ConnectedRouter
                    history={history}
                >

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
                </ConnectedRouter>
            </div>
        </>
    )
}

export default App;