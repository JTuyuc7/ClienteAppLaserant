import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { agregarOmodificarMiddlewae, agregarOModificarProducto, productoSeleccionado } from '../store/store';

const Formulario = () => {
    const { codigo } = useParams();
    const categorias = [
        { codigo: 1, nombre: 'Categoria 1'},
        { codigo: 2, nombre: 'Categoria 2'},
        { codigo: 3, nombre: 'Categoria 3'},
        { codigo: 4, nombre: 'Categoria 4'}
    ]
    const dispatch = useDispatch()
    const producto = useSelector( (state) => state.producto);
    //console.log(producto, 'producto seleccionado')
    const [ values, setValues ] = useState({
        codigo: '',
        nombre: '',
        cantidad: '',
        precio: '',
        categoria: 1
    });

    const { nombre, cantidad, precio, categoria } = values;

    useEffect(() => {
        setValues({
            codigo: producto.codigo || 0,
            nombre: producto.nombre || '',
            cantidad: producto.cantidad || '',
            precio: producto.precio || '',
            categoria: producto.categoria || 1
        })

        if( codigo != producto.codigo ){
            dispatch(productoSeleccionado(codigo))
        }
    },[producto])

    const onChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setValues( (v) => ({
            ...v,
            [name] : value
        }));
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const payload = {
            ...values,
            codigo: producto.codigo
        }
        dispatch(agregarOModificarProducto(payload))

        // Resetear e form
    }

    const canSave = !!(values.nombre && values.cantidad && values.precio);

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input type="hidden" name="codigo" id="codigo" value={values.codigo} />
                <div className="mt-3">
                    <label className="form-label" htmlFor="nombre">Nombre</label>
                    <input className="form-control" type="text" name="nombre" id="nombre" value={values.nombre} onChange={ (event) => onChange(event) } />
                </div>
                <div className="mt-3">
                    <label className="form-label" htmlFor="cantidad">Cantidad</label>
                    <input className="form-control" type="number" name="cantidad" id="cantidad" value={cantidad} onChange={(event) => onChange(event)} />
                </div>
                <div className="mt-3">
                    <label className="form-label" htmlFor="precio">Precio</label>
                    <div className="input-group">
                        <span className="input-group-text">Q</span>
                        <input className="form-control" type="number" name="precio" id="precio" value={precio} onChange={(event) => onChange(event)} />
                    </div>
                </div>
                <div className="mt-3">
                    <label className="form-label" htmlFor="categoria">Categoria</label>
                    <select className="form-control" name="categoria" id="categoria" value={categoria} onChange={(event) => onChange(event)} >
                        <option value="1">Categoria 1</option>
                        <option value="2">Categoria 2</option>
                        <option value="3">Categoria 3</option>
                        <option value="4">Categoria 4</option>
                    </select>
                </div>
                <div className="mt-5">
                    <button className="btn btn-primary" type="submit">Guardar</button>
                </div>
            </form>
        </div>
    )
}

export default Formulario;