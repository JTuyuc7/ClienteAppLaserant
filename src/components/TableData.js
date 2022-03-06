import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { productoEliminado, productoSeleccionado } from '../store/store';

const ProductItem = (props) => {
    const ele = props.item;
    const { eliminar, selecionar } = props.acciones;

    return(
        <tr>
            <td>{ele.codigo}</td>
            <td>{ele.nombre}</td>
            <td>{ele.cantidad}</td>
            <td>${ele.precio}</td>
            <td>${ele.total}</td>
            <td> 
                <div className="btn-group">
                    <a 
                        title="Editar" 
                        href="#" 
                        className="btn btn-sm btn-outline-secondary" 
                        onClick={ () => selecionar(ele.codigo)}>
                            <i className="bi bi-pencil-square"></i>
                    </a> 
                    <a 
                        title="Eliminar" 
                        href="#" 
                        className="btn btn-sm btn-outline-danger" 
                        onClick={ () => eliminar(ele.codigo)}>
                            <i className="bi bi-trash3"></i>
                    </a>
                </div>
            </td>
        </tr>
    )
}

const sumarTotal = ( ele, selec ) => {
    return ele.map(selec).reduce((a,b) => Number(a) + Number(b), 0);
}

const TableData = () => {

    const products = useSelector( (state) => state.productos);
    const dispatch = useDispatch();

    //const products = [
    //    { codigo: 1, nombre: 'Producto 1', cantidad: 15, precio: 250, total: 500},
    //    { codigo: 2, nombre: 'Producto 2', cantidad: 10, precio: 50, total: 200}
    //];

    const selecionar = (codigo) => {
        //console.log('seleccionado', codigo)
        dispatch(productoSeleccionado(codigo))
    }

    const eliminar = (codigo) => {
        //console.log('a Eliminar', codigo )
        dispatch(productoEliminado(codigo))
    }

    const acciones = {
        selecionar,
        eliminar
    }

    const cantidadTotal = sumarTotal(products, x => x.cantidad );
    const precioTotal = sumarTotal(products, x => x.precio);
    const granTotal = sumarTotal(products, x => x.total)

    return (
        <div className="mt-5">
            <table className="table mb-5">
            <thead>
                <tr>
                <td>Codigo</td>
                <td>Nombre</td>
                <td>Cantidad</td>
                <td>Precio</td>
                <td>Total</td>
                <td></td>
                </tr>
            </thead>
            <tbody>
                { products.map( (ele, index) => {

                    return(
                        <ProductItem 
                            item={ele}
                            key={ele.codigo}
                            acciones={acciones}
                        />
                    )
                })}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="2">Totales:</td>
                    <td>{cantidadTotal}</td>
                    <td>${precioTotal}</td>
                    <td>${granTotal}</td>
                    <td></td>
                </tr>
            </tfoot>
            </table>
        </div>
    );
}

export default TableData;