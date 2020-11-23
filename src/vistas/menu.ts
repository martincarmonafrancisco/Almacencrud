import { leerTeclado } from '../vistas/lecturaTeclado'

export const menuProducto = async () => {
    let n: number
    console.log('\n')
    console.log('1.- Agregar Producto')
    console.log('2.- Precio + IVA')
    console.log('3.- Salvar en BD')
    console.log('4.- Modificar Producto de la BD')
    console.log('5.- Borrar Producto de la BD')
    console.log('6.- Cargar Producto desde la BD')
    console.log('7.- Mostrar Producto')
    console.log('0.- SALIR')
    n = parseInt( await leerTeclado('--OPCIÓN--') )
    return n
}