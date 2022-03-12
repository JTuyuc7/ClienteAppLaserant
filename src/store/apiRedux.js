import api from "./api";
import { push } from 'connected-react-router'; 

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
                await api.newProduct(action.payload);
                //const productos = await api.all();
                //store.dispatch({ type: 'ASSIGN_PRODUCTS', payload: productos });
                //store.dispatch(asignapProductos(productos));
                //window.location.href = '/';
                dispatch(push('/'))
                break;
            }
        case 'PRODUCTO_MODIFICADO':
            {
                await api.editProduct(action.payload);
                /* const productos = await api.all();
                //store.dispatch({ type: 'ASSIGN_PRODUCTS', payload: productos });
                store.dispatch(asignapProductos(productos));
                //window.location.href = '/'; */

                dispatch(push('/'))
                break;
            }
        case 'ELIMINAR_PRODUCTO':
            {
                await api.deleteProducto(action.payload.codigo);
                const productos = await api.all();
                store.dispatch(asignapProductos(productos))
                break;
            }
        case 'PRODUCTO_SELECCIONADO':
            {
                const { codigo } = action.payload.codigo;
                if(codigo){
                    const producto = await api.getProduct(codigo);
                    next({ type: action.type, payload: producto })
                }else {
                    next({ type: action.type, payload: {} })
                }
                break
            }
        default:
            next(action)
    }
}

export default apiMiddleware;