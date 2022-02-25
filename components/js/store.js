const actionTypes = {
    PRODUCTO_AGREGADO: "PRODUCTO_AGREGADO",
    PRODUCTO_MODIFICADO: 'PRODUCTO_MODIFICADO',
    ELIMINAR_PRODUCTO: 'ELIMINAR_PRODUCTO',
    PRODUCTO_SELECCIONADO: 'PRODUCTO_SELECCIONADO',
    PRODUCTO_AGREGADO_MODIFICADO: 'PRODUCTO_AGREGADO_MODIFICADO'
};

const reducer = (state, action) => {

    switch (action.type) {
        case actionTypes.PRODUCTO_AGREGADO:
            return productoAgregadoReducer(state, action);
        case actionTypes.PRODUCTO_MODIFICADO:
            return productoModificadoReducer(state, action);
        case actionTypes.ELIMINAR_PRODUCTO:
            return productoEliminadoReducer(state,action);
        case actionTypes.PRODUCTO_SELECCIONADO:
            return productoSeleccionadoReducer(state,action);
        default:
            return state;
    }
}

// Crear un actio builder
const productoSeleccionado = (codigo) => ({
    type: actionTypes.PRODUCTO_SELECCIONADO,
    payload: {
        codigo: codigo
    }
});

const productoEliminado = (codigo) => ({
    type: actionTypes.ELIMINAR_PRODUCTO,
    payload: {
        codigo: codigo
    }
});

const productoEditado = (data) => ({
    type: actionTypes.PRODUCTO_MODIFICADO,
    payload: data
});

const productoNuevo = (data) => ({
    type: actionTypes.PRODUCTO_AGREGADO,
    payload: data
});

const agregarOModificarProducto = (payload) => ({
    type: actionTypes.PRODUCTO_AGREGADO_MODIFICADO,
    payload: payload
})
/*
function loggerMiddleware(store){
    return function dispatchWrapper(next){
        return function actionHandler(action){
            next(action)
            const state = store.getState();
            console.log('dispatching', action)
            console.log('state after', state)
        }
    }
}*/

const loggerMiddleware = store => next => action => {
    console.log('dispatching', action);
    const result = next(action);
    console.log('nex state', store.getState());
    return result;
};

const agregarOmodificarMiddlewae = store => next => action => {
    if( action.type != actionTypes.PRODUCTO_AGREGADO_MODIFICADO){
        return next(action)
    }

    const data = action.payload;
    if( data.codigo ){
        store.dispatch(productoEditado(data))
    }else {
        store.dispatch(productoNuevo(data))
    }

    return store.dispatch(productoSeleccionado(null))
}

function generadorCodigoBuilder(codigoInicial){
    let codigo = codigoInicial;
    return store => next => action => {
        if( action.type != actionTypes.PRODUCTO_AGREGADO){
            return next(action);
        }
        codigo++;
        const actionToDispatch = {
            ...action,
            payload: {
                ...action.payload,
                codigo
            }
        }
        //action.payload = {...action.payload, codigo};
        return next(actionToDispatch);
    }
}

function productoAgregadoReducer (state, action) {
    let total = action.payload.cantidad * action.payload.precio;
    return {
        ...state,
        productos: [
            ...state.productos,
            {
                ...action.payload,
                total: total
            }
        ]
    }
};

function productoModificadoReducer(state, action){
    // Crear una copia del arreglo original
    const productosCopia = state.productos;
    const codigo = action.payload.codigo;
    let total = action.payload.precio * action.payload.cantidad;
    //console.log(total, 'nuevo Total?')
    const old = productosCopia.find( (ele) => ele.codigo === codigo);
    const idx = productosCopia.indexOf(old);

    // reemplazar en el state con el objeto modificado
    productosCopia[idx] = {...action.payload, total};

    // retornar el state actualizado
    return {
        ...state,
        productos: productosCopia
    }
};

function productoEliminadoReducer(state,action){
    const codigo = action.payload.codigo;
    const productosCopia = state.productos.filter( (ele) => ele.codigo != codigo)
    return {
        ...state,
        productos: productosCopia
    }
};

function productoSeleccionadoReducer(state,action){
    //console.log(state.producto, 'seleccionado')
    const codigo = action.payload.codigo;
    return{
        ...state,
        producto: state.productos.find( x => x.codigo === codigo ) || {}
    }
}