import { applyMiddleware, createStore } from 'redux';
import * as $store from './store';
import apiMiddleware from './apiRedux';

const savedStateT = localStorage.getItem("state");
const newData = savedStateT && JSON.parse(savedStateT);

// State para los productos
//const savedState = JSON.parse(sessionStorage.getItem("state") | "{}");
const preloadedState = newData || {
    producto: {},
    productos: []
};

// Crear la Store
const middleware = applyMiddleware(
    $store.loggerMiddleware,
    $store.agregarOmodificarMiddlewae,
    //$store.generadorCodigoBuilder(0),
    //$store.StorageMiddleware,
    apiMiddleware,
)
const store = createStore($store.reducer, preloadedState, middleware);

export default store;