export const ui = {
    onFormSubmit: (data) => {},
    renderForm,
    onEliminarClick: (codigo) => {},
    onEditarClick: (codigo) => {},
    renderTable
};

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

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const values = Array.from(data.entries());

    const [frmCodigo, frmNombre, frmCantidad, frmPrecio, frmCategoria] = values;

    const codigo = parseInt(frmCodigo[1]);
    const nombre = frmNombre[1];
    const cantidad = parseFloat(frmCantidad[1]);
    const precio = parseFloat(frmPrecio[1]);
    const categoria = frmCategoria[1];
    ui.onFormSubmit({
        codigo,
        nombre,
        cantidad,
        precio,
        categoria
    });
});


//Llenar los datos en en form a editar
function renderForm(producto) {
    const { codigo, precio, cantidad, nombre, categoria} = producto;
    inputCodigo.value = codigo || '';
    inputPrecio.value = precio || '';
    inputCantidad.value = cantidad || '';
    inputNombre.value = nombre || '';
    selectCategoria.value = categoria || 1;
}

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
            ui.onEliminarClick(ele.codigo); //Metodo para eliminar
            
            /*store.dispatch({
                type: 'ELIMINAR_PRODUCTO',
                payload: {
                    codigo: ele.codigo
                }
            })*/
        });

        
        editar.addEventListener('click', (e) => {
            e.preventDefault();
            ui.onEditarClick(ele.codigo); // Metodo para editar
            /*store.dispatch({
                type: 'PRODUCTO_SELECCIONADO',
                payload: {
                    codigo: ele.codigo
                }
            })*/
        })
        
        // Cambiar el payload del producto seleccionado para evitar validaciones
        /*
        editar.addEventListener('click', (e) => {
            e.preventDefault();
            store.dispatch({
                type: 'PRODUCTO_SELECCIONADO',
                payload: {
                    nombre: ele.nombre,
                    codigo: ele.codigo,
                    cantidad: ele.cantidad,
                    precio: ele.precio,
                    categoria: ele.categoria
                }
            })
        });
        */
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