const persona = {
    nombre: 'James',
    apellido: 'Tuyuc',
    edad: 24,
    direccion: {
        departamento: 'Chimaltenango',
        municipio: 'Comalapa'
    }
};

//const persona1 = Object.assign({}, persona, {apellido: 'test 2'}); // Crear una nueva referencia del objeto
const persona1 = {
    ...persona, 
    apellido: 'Nuevo Test', 
    telefono: '123456789',
    direccion: {
        ...persona.direccion,
        municipio: 'Nuevo Municipio'
    }
}

//persona1.apellido = 'Prueba Apellido';

//console.log('persona', persona);
//console.log('persona1', persona1)

//jnicole_pda

// ARREGLOS INMUTABLES
const listaNumeros = [1,2,3,4,5];

//const listaNumeros2 = listaNumeros;
//listaNumeros2.push(6);

const lista3 = [0,...listaNumeros, 7];

// Encontrar el indice para insertar los datos
const index = listaNumeros.indexOf(3);
const lista4 = [
    ...listaNumeros.slice(0, index),
    1.5,
    ...listaNumeros.slice(index)
];

// Retornar todos los elementos exepto 2
const lista5 = listaNumeros.filter(n => n != 2);

// Modifical un valor usando map
const lista6 = listaNumeros.map( n => n === 2 ? n = 10 : n)

//console.log(listaNumeros, 'lista 1');
//console.log(listaNumeros2, 'Lista 2');
//console.log(lista3, 'nueva lista 3');
//console.log(lista4, 'lista 4');
//console.log(lista5, 'Lista 5 filter');
//console.log(lista6, 'Lista usando map')