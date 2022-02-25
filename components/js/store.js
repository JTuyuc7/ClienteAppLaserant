let indice = 0; 
const reducer = (state, action) => {
    if( action.type === "PRODUCTO_AGREGADO"){
        indice++;
        let total = action.payload.cantidad * action.payload.precio;
        return {
            ...state,
            productos: [
                ...state.productos,
                {
                    ...action.payload,
                    codigo: indice,
                    total: total
                }
            ]
        }
    }
    if( action.type === 'PRODUCTO_MODIFICADO'){
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
    }

    if( action.type === 'ELIMINAR_PRODUCTO'){
        const codigo = action.payload.codigo;
        const productosCopia = state.productos.filter( (ele) => ele.codigo != codigo)
        return {
            ...state,
            productos: productosCopia
        }
    };

    
    if( action.type === 'PRODUCTO_SELECCIONADO'){
        //console.log(state.producto, 'seleccionado')
        const codigo = action.payload.codigo;
        return{
            ...state,
            producto: state.productos.find( x => x.codigo === codigo ) || {}
        }
    }
    
    /*
    if( action.type === 'PRODUCTO_SELECCIONADO'){
        console.log(action.payload, 'payload')
        return{
            ...state,
            producto: action.payload
        }
    }*/



    return state;
}

// Crear un actio builder
const productoSeleccionado = (codigo) => ({
    type: 'PRODUCTO_SELECCIONADO',
    payload: {
        codigo: codigo
    }
});

const productoEliminado = (codigo) => ({
    type: 'ELIMINAR_PRODUCTO',
    payload: {
        codigo: codigo
    }
});

const productoEditado = (data) => ({
    type: 'PRODUCTO_MODIFICADO',
    payload: data
});

const productoNuevo = (data) => ({
    type: "PRODUCTO_AGREGADO",
    payload: data
})