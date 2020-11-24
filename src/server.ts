import { menuProducto } from './vistas/menu'
import { leerTeclado } from './vistas/lecturaTeclado'
import { Producto, Productos, tProducto} from './model/Producto'
import { db } from './database/database'

const main = async () => {
    let n: number
    let query: any

    let nombre: string, precio: number, tipo: string, cantidad: number, caducidad: Date
    let producto: Producto = new Producto("",0,"",0,new Date())


    await setBD(true) // true BD local; false BD Atlas

    do {
        n = await menuProducto()

        switch(n){
            case 1:
                nombre = await leerTeclado('Introduzca el nombre del producto')
                precio =  parseInt( await leerTeclado('Introduzca el precio'))
                tipo =  await leerTeclado('Introduzca el tipo de producto (alimentacion/sanitario)')
                cantidad =  parseInt( await leerTeclado('Introduzca la cantidad del producto'))
                caducidad = new Date(await leerTeclado('fecha de caducidad (formato aaaa-mm-DD)'))
                producto = new Producto(nombre, precio, tipo, cantidad, caducidad)
                try {
                    nombre = producto.nombre
                }catch(error){
                    console.log(error)
                    producto = new Producto("",0,"",0,new Date())
                }
                break
            case 2:
                try{
                    let iva = producto.iva()
                    console.log(`Precio con IVA incluido= ${iva}€`)
                }catch (e){
                    console.log("No ha entrado en la opción 1: " + e)
                }
                break
            case 3:
                await db.conectarBD()
                const dSchema = {
                    _nombre: producto.nombre,
                    _precio: producto.precio,
                    _tipo: producto.tipo,
                    _cantidad: producto.cantidad,
                    _caducidad: producto.caducidad
                }
                const oSchema = new Productos(dSchema)
                await oSchema.save()
                .then( (doc) => console.log('Salvado Correctamente: '+ doc) )
                .catch( (err: any) => console.log('Error: '+ err))
                await db.desconectarBD()
                break
            case 4:
                await db.conectarBD()
                nombre = await leerTeclado('Introduzca el nombre del producto')
                precio =  parseInt( await leerTeclado('Introduzca el nuevo precio'))
                tipo =  await leerTeclado('Introduzca el nuevo tipo de producto (alimentacion/sanitario)')
                cantidad =  parseInt( await leerTeclado('Introduzca la nueva cantidad del producto'))
                caducidad = new Date(await leerTeclado('fecha de caducidad nueva (formato aaaa-mm-DD)'))
                producto = new Producto(nombre, precio, tipo, cantidad, caducidad)

                await Productos.findOneAndUpdate({ _nombre: producto.nombre }, 
                    {
                        _nombre: producto.nombre,
                        _precio: producto.precio,
                        _tipo: producto.tipo,
                        _cantidad: producto.cantidad,
                        _caducidad: producto.caducidad
                    },
                    {
                        runValidators: true
                    }  
                )                
                .then(() => console.log('Modificado Correctamente') )
                .catch( (err) => console.log('Error: '+err))
                await db.desconectarBD()
                break
            case 5:
                await db.conectarBD()
                nombre = await leerTeclado('Introduzca el nombre del producto')
                await Productos.findOneAndDelete({ _nombre: producto.nombre }, 
                    (err: any, doc) => {
                        if(err) console.log(err)
                        else{
                            if (doc == null) console.log(`No encontrado`)
                            else console.log('Borrado correcto: '+ doc)
                        }
                    })
                await db.desconectarBD()
                break
            case 6:
                await db.conectarBD()
                nombre = await leerTeclado('Introduzca el nombre del producto')
                await Productos.findOne( {_nombre: nombre}, 
                    (error, doc: any) => {
                        if(error) console.log(error)
                        else{
                            if (doc == null) console.log('No existe')
                            else {
                                console.log('Existe: '+ doc)
                                producto = 
                                    new Producto(doc._nombre, doc._precio, doc._tipo, doc.cantidad, doc.caducidad)
                                producto.iva = doc.iva  
                            }
                        }
                    } )
                    await db.desconectarBD()
                    break
                case 7:
                console.log(`Nombre: ${producto.nombre}`)
                console.log(`Precio: ${producto.precio}`)
                console.log(`Tipo: ${producto.tipo}`)
                console.log(`Cantidad: ${producto.cantidad}`)
                console.log(`Caducidad: ${producto.caducidad}`)                               
                break

                case 8:
                    try{
                        let dias = producto.dias()
                        console.log(`Quedan ${dias} días para que el producto o productos caduquen`)
                    }catch (e){
                        console.log("No ha entrado en la opción 1: " + e)
                    }
                    break
            case 0:
                console.log('\n--Gracias por usar nuestro programa--')
                break
            default:
                console.log("Opción incorrecta")
                break
        }
    }while (n != 0)
}

const setBD = async (local: boolean) => {
    
    const bdLocal = 'test'

    const conexionLocal = `mongodb://localhost/${bdLocal}`
    if (local) {
        db.cadenaConexion = conexionLocal
    }else{
        const bdAtlas = 'prueba'
        const userAtlas = await leerTeclado('Usuario BD Atlas')
        const passAtlas = await leerTeclado('Password BD Atlas')
        const conexionAtlas =  
        `mongodb+srv://${userAtlas}:${passAtlas}@cluster0.5tysr.mongodb.net/${bdAtlas}?retryWrites=true&w=majority`
        db.cadenaConexion = conexionAtlas
    }
}

main()