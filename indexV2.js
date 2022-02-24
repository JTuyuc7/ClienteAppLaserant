const form = document.getElementsByTagName('form')[0];
/** @type {HTMLInputElement} */
const inputCodigo = document.getElementById('codigo');
/** @type {HTMLInputElement} */
const inputNombre = document.getElementById('nombre');
/** @type {HTMLInputElement} */
const inputCantidad = document.getElementById('cantidad');
/** @type {HTMLInputElement} */
const inputPrecio = document.getElementById('precio');
/** @type {HTMLInputElement} */
const selectCategoria = document.getElementById('categoria');
const tbody = document.getElementsByTagName('tbody')[0];
const cantidadTotalElement = document.getElementById('cantidad-total');
const precioTotalElement = document.getElementById('precio-total');
const granTotatlElement = document.getElementById('gran-total');

// State para los productos
const preloadedState = {
    producto: {},
    productos: []
};

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
    }

    return state;
}

// Crear la Store
const store = Redux.createStore(reducer, preloadedState);

let letesState;

const unsuscribe = store.subscribe( () => {
    let currentState = store.getState();

    if( currentState != letesState){
        letesState = currentState;
        renderTable(currentState.productos)
    }
    //console.log('ejecutando el subscribe', store.getState())
});

// Mostrar los nuevos productos en UI
function renderTable(productos){

    const filas = productos.map( (ele) => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${ele.codigo}</td>
            <td>${ele.nombre}</td>
            <td>${ele.cantidad}</td>
            <td>${ele.precio}</td>
            <td>${ele.total}</td>
            <td> 
                <div class="btn-group">
                    <a title="Editar" href="#" class="btn btn-sm btn-outline-secondary">
                        <i class="bi bi-pencil-square"></i>
                    </a> 
                    <a title="Eliminar" href="#" class="btn btn-sm btn-outline-danger">
                        <i class="bi bi-trash3"></i>
                    </a>
                </div>
            </td>
        `;
        const [ editar, eiminar ] = tr.getElementsByTagName('a');
        eiminar.addEventListener('click', (e) => {
            e.preventDefault();

            store.dispatch({
                type: 'ELIMINAR_PRODUCTO',
                payload: {
                    codigo: ele.codigo
                }
            })
        })
        return tr;
    })

    tbody.innerHTML = '';
    filas.forEach( (ele) => {
        tbody.appendChild(ele)
    })
    
    const cantidadTotal = productos.map( (x) => x.cantidad ).reduce( (a,b) => a + b, 0);
    const precioTotal = productos.map( (x) => x.precio ).reduce( (a, b) => a + b, 0);
    const granTotal = productos.map( (c) => c.total).reduce( (a, b) => a + b, 0);
    
    cantidadTotalElement.innerText = cantidadTotal;
    precioTotalElement.innerText = precioTotal;
    granTotatlElement.innerText = granTotal;
}


store.dispatch({
    type: "PRODUCTO_AGREGADO",
    payload: {
        nombre: 'Producto 1',
        cantidad: 2,
        precio: 25,
        categoria: 2
    }
});

store.dispatch({
    type: "PRODUCTO_AGREGADO",
    payload: {
        nombre: 'Producto 2',
        cantidad: 1,
        precio: 250,
        categoria: 1
    }
});

store.dispatch({
    type: "PRODUCTO_AGREGADO",
    payload: {
        nombre: 'Producto 3',
        cantidad: 5,
        precio: 35,
        categoria: 3
    }
});

store.dispatch({
    type: "PRODUCTO_AGREGADO",
    payload: {
        nombre: 'Producto 4',
        cantidad: 5,
        precio: 10,
        categoria: 4
    }
})

// Modificar el producto
store.dispatch({
    type: 'PRODUCTO_MODIFICADO',
    payload: {
        nombre: 'Producto Modificado 4',
        cantidad: 10,
        precio: 5,
        categoria: 1,
        codigo: 3
    }
});

// Eliminar el Producto
store.dispatch({
    type: "ELIMINAR_PRODUCTO",
    payload: {
        codigo: 2
    }
})