/*import { applyMiddleware, createStore } from 'redux';
import * as $store from './store';

const savedStateT = sessionStorage.getItem("state");
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
    $store.generadorCodigoBuilder(0),
    $store.StorageMiddleware
)
const store = createStore($store.reducer, preloadedState, middleware);

export default store;

*/