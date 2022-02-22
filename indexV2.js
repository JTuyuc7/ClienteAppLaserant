// State para los productos
const preloadedState = {
    producto: {},
    productos: []
};

const reducer = (state, action) => {
    if( action.type === "PRODUCTO_AGREGADO"){
        return {
            ...state,
            productos: [...state.productos, action.payload ]
        }
    }

    return state;
}

// Crear la Store
const store = Redux.createStore(reducer, preloadedState);

store.subscribe( () => {
    console.log('ejecutando el subscribe', store.getState())
});

store.dispatch({
    type: "PRODUCTO_AGREGADO",
    payload: {
        id: 1,
        nombre: 'Producto 1'
    }
});

store.dispatch({
    type: "PRODUCTO_AGREGADO",
    payload: {
        id: 2,
        nombre: 'Producto 2'
    }
})

//console.log(store, 'store*-*-*-*-*')