import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import './components/js/app';


const container = document.getElementById('root');

const App = () => (
    <div className='app'>
        <h1>Hola React hace Web pack render refresh?</h1>
    </div>
);

ReactDOM.render(<App/>, container);