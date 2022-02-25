// State para los productos
const preloadedState = {
    producto: {},
    productos: []
};

// Crear la Store
const store = Redux.createStore(reducer, preloadedState);

let letesState;

store.subscribe( () => {
    let currentState = store.getState();

    if( currentState != letesState){
        letesState = currentState;
        ui.renderTable(currentState.productos);
        ui.renderForm(currentState.producto);
    }
});

// Definir el nuevo submit
ui.onFormSubmit = (data) => {
    if( data.codigo ){
        store.dispatch(productoEditado(data))
    }else {
        store.dispatch(productoNuevo(data))
    }

    store.dispatch(productoSeleccionado(null))
}

ui.onEliminarClick = (codigo) => {
    store.dispatch(productoEliminado(codigo))
}

ui.onEditarClick = (codigo) => {
    store.dispatch(productoSeleccionado(codigo))
}