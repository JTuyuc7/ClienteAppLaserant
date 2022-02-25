// State para los productos
const preloadedState = {
    producto: {},
    productos: []
};

// Crear la Store
const middleware = Redux.applyMiddleware(
    loggerMiddleware,
    agregarOmodificarMiddlewae,
    generadorCodigoBuilder(0)
)
const store = Redux.createStore(reducer, preloadedState, middleware);


store.subscribe(dispatchOnChange( store, (state) => {
    ui.renderTable(state.productos);
    ui.renderForm(state.producto);
}))

// Definir el nuevo submit
ui.onFormSubmit = (data) => {
    store.dispatch(agregarOModificarProducto(data))
}

ui.onEliminarClick = (codigo) => {
    store.dispatch(productoEliminado(codigo))
}

ui.onEditarClick = (codigo) => {
    store.dispatch(productoSeleccionado(codigo))
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