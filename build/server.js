"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const menu_1 = require("./vistas/menu");
const lecturaTeclado_1 = require("./vistas/lecturaTeclado");
const Producto_1 = require("./model/Producto");
const database_1 = require("./database/database");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    let n;
    let query;
    let nombre, precio, tipo, cantidad, caducidad;
    let producto = new Producto_1.Producto("", 0, "", 0, new Date());
    yield setBD(true); // true BD local; false BD Atlas
    do {
        n = yield menu_1.menuProducto();
        switch (n) {
            case 1:
                nombre = yield lecturaTeclado_1.leerTeclado('Introduzca el nombre del producto');
                precio = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca el precio'));
                tipo = yield lecturaTeclado_1.leerTeclado('Introduzca el tipo de producto (alimentacion/sanitario)');
                cantidad = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca la cantidad del producto'));
                caducidad = new Date(yield lecturaTeclado_1.leerTeclado('fecha de caducidad (formato aaaa-mm-DD)'));
                producto = new Producto_1.Producto(nombre, precio, tipo, cantidad, caducidad);
                try {
                }
                catch (error) {
                    console.log(error);
                    producto = new Producto_1.Producto("", 0, "", 0, new Date());
                }
                break;
            case 2:
                try {
                    let iva = producto.iva();
                    console.log(`Precio con IVA incluido= ${iva}€`);
                }
                catch (e) {
                    console.log("No ha entrado en la opción 1: " + e);
                }
                break;
            case 3:
                yield database_1.db.conectarBD();
                const dSchema = {
                    _nombre: producto.nombre,
                    _precio: producto.precio,
                    _tipo: producto.tipo,
                    _cantidad: producto.cantidad,
                    _caducidad: producto.caducidad
                };
                const oSchema = new Producto_1.Productos(dSchema);
                yield oSchema.save()
                    .then((doc) => console.log('Salvado Correctamente: ' + doc))
                    .catch((err) => console.log('Error: ' + err));
                yield database_1.db.desconectarBD();
                break;
            case 4:
                yield database_1.db.conectarBD();
                nombre = yield lecturaTeclado_1.leerTeclado('Introduzca el nombre del producto');
                precio = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca el nuevo precio'));
                tipo = yield lecturaTeclado_1.leerTeclado('Introduzca el nuevo tipo de producto (alimentacion/sanitario)');
                cantidad = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca la nueva cantidad del producto'));
                caducidad = new Date(yield lecturaTeclado_1.leerTeclado('fecha de caducidad nueva (formato aaaa-mm-DD)'));
                producto = new Producto_1.Producto(nombre, precio, tipo, cantidad, caducidad);
                yield Producto_1.Productos.findOneAndUpdate({ _nombre: producto.nombre }, {
                    _nombre: producto.nombre,
                    _precio: producto.precio,
                    _tipo: producto.tipo,
                    _cantidad: producto.cantidad,
                    _caducidad: producto.caducidad
                }, {
                    runValidators: true
                })
                    .then(() => console.log('Modificado Correctamente'))
                    .catch((err) => console.log('Error: ' + err));
                yield database_1.db.desconectarBD();
                break;
            case 5:
                yield database_1.db.conectarBD();
                nombre = yield lecturaTeclado_1.leerTeclado('Introduzca el nombre del producto');
                yield Producto_1.Productos.findOneAndDelete({ _nombre: producto.nombre }, (err, doc) => {
                    if (err)
                        console.log(err);
                    else {
                        if (doc == null)
                            console.log(`No encontrado`);
                        else
                            console.log('Borrado correcto: ' + doc);
                    }
                });
                yield database_1.db.desconectarBD();
                break;
            case 6:
                yield database_1.db.conectarBD();
                nombre = yield lecturaTeclado_1.leerTeclado('Introduzca el nombre del producto');
                yield Producto_1.Productos.findOne({ _nombre: nombre }, (error, doc) => {
                    if (error)
                        console.log(error);
                    else {
                        if (doc == null)
                            console.log('No existe');
                        else {
                            console.log('Existe: ' + doc);
                            producto =
                                new Producto_1.Producto(doc._nombre, doc._precio, doc._tipo, doc.cantidad, doc.caducidad);
                            producto.iva = doc.iva;
                        }
                    }
                });
                yield database_1.db.desconectarBD();
                break;
            case 7:
                console.log(`Nombre: ${producto.nombre}`);
                console.log(`Precio: ${producto.precio}`);
                console.log(`Tipo: ${producto.tipo}`);
                console.log(`Cantidad: ${producto.cantidad}`);
                console.log(`Caducidad: ${producto.caducidad}`);
                break;
            case 0:
                console.log('\n--Gracias por usar nuestro programa--');
                break;
            default:
                console.log("Opción incorrecta");
                break;
        }
    } while (n != 0);
});
const setBD = (local) => __awaiter(void 0, void 0, void 0, function* () {
    const bdLocal = 'test';
    const conexionLocal = `mongodb://localhost/${bdLocal}`;
    if (local) {
        database_1.db.cadenaConexion = conexionLocal;
    }
    else {
        const bdAtlas = 'prueba';
        const userAtlas = yield lecturaTeclado_1.leerTeclado('Usuario BD Atlas');
        const passAtlas = yield lecturaTeclado_1.leerTeclado('Password BD Atlas');
        const conexionAtlas = `mongodb+srv://${userAtlas}:${passAtlas}@cluster0.5tysr.mongodb.net/${bdAtlas}?retryWrites=true&w=majority`;
        database_1.db.cadenaConexion = conexionAtlas;
    }
});
main();
