/*
import { applyMiddleware, createStore } from 'redux';
import { ui } from './ui';
import * as $store from './store';

// State para los productos
const preloadedState = {
    producto: {},
    productos: []
};

// Crear la Store
const middleware = applyMiddleware(
    $store.loggerMiddleware,
    $store.agregarOmodificarMiddlewae,
    $store.generadorCodigoBuilder(0)
)
const store = createStore($store.reducer, preloadedState, middleware);


store.subscribe(dispatchOnChange( store, (state) => {
    ui.renderTable(state.productos);
    ui.renderForm(state.producto);
}))

// Definir el nuevo submit
ui.onFormSubmit = (data) => {
    store.dispatch($store.agregarOModificarProducto(data))
}

ui.onEliminarClick = (codigo) => {
    store.dispatch($store.productoEliminado(codigo))
}

ui.onEditarClick = (codigo) => {
    store.dispatch($store.productoSeleccionado(codigo))
}

function dispatchOnChange(store, dispatch){
    let latestState;

    return function (){
        let currentState = store.getState();

        if( currentState != latestState){
            latestState = currentState;
            //ui.renderTable(currentState.productos);
            //ui.renderForm(currentState.producto);
            dispatch(currentState);
        }
    }
}

// Codigo Antes de usar React Redux

*/