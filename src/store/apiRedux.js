import api from "./api";

const asignapProductos = (payload) => {
    type: 'ASSIGN_PRODUCTS',
    payload
}

const apiMiddleware = (store) => (next) => async (action) => {

    switch (action.type) {
        case 'GET_PRODUCTS':
            {   
                const productos = await api.all();
                //store.dispatch({ type: 'ASSIGN_PRODUCTS', payload: productos });
                store.dispatch(asignapProductos(productos))
                break
            }
        case 'PRODUCTO_AGREGADO':
            {
                const producto = await api.newProduct(action.payload);
                const productos = await api.all();
                //store.dispatch({ type: 'ASSIGN_PRODUCTS', payload: productos });
                store.dispatch(asignapProductos(productos))
                break;
            }
        case 'PRODUCTO_MODIFICADO':
            {
                await api.editProduct(action.payload);
                const productos = await api.all();
                //store.dispatch({ type: 'ASSIGN_PRODUCTS', payload: productos });
                store.dispatch(asignapProductos(productos))
                break;
            }
        case 'ELIMINAR_PRODUCTO':
            {
                await api.deleteProducto(action.payload.codigo);
                const productos = await api.all();
                store.dispatch(asignapProductos(productos))
                break;
            }
        default:
            next(action)
    }
}

export default apiMiddleware;