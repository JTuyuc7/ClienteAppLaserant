import { applyMiddleware, combineReducers, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import * as $store from './store';
import apiMiddleware from './apiRedux';

const savedStateT = localStorage.getItem("state");
const newData = savedStateT && JSON.parse(savedStateT);

const history = createBrowserHistory();

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
    routerMiddleware(history),
)

const reducer = combineReducers({
    router: connectRouter(history),
    producto: $store.producto,
    productos: $store.asignarProductos
})

const store = createStore(reducer, preloadedState, middleware);
export { history };
export default store;
