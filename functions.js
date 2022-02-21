function mensaje(prefijo, formateador){

    return function(texto){
        return formateador(prefijo, texto)
    }
}

//const formatoBienvenida = function(prefijo, texto){
//    return "!" + prefijo + ' ' + texto + "!";
//}

//const formatoDespedida = function( prefijo, texto){
//    return "!" + prefijo + ' ' + texto + '... :(';
//}

const formatoBienvenida = (prefijo, texto) =>  "!" + prefijo + ' ' + texto + "!"; // arrow Functions

const formatoDespedida = ( prefijo, texto) => "!" + prefijo + ' ' + texto + '... :(';

//const bienvienido = mensaje('Hola', formatoBienvenida);
//const despedida = mensaje('adios', formatoDespedida);

const bienvienido = mensaje('Hola', (a, b) => `!${a} ${b} !`);
const despedida = mensaje('adios', (prefijo, texto) => prefijo + " " + texto + "... :(");

console.log(bienvienido('mundo'));
console.log(despedida('mundo'));