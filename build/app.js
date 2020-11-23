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
const Triangulo_1 = require("./model/Triangulo");
const database_1 = require("./database/database");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    let n;
    let query;
    let nombre, base, altura, lado1, lado2;
    let triangulo = new Triangulo_1.Triangulo("", 0, 0, 0);
    yield setBD(false); // true BD local; false BD Atlas
    do {
        n = yield menu_1.menuTriangulo();
        switch (n) {
            case 1:
                nombre = yield lecturaTeclado_1.leerTeclado('Introduzca el nombre único del triángulo');
                base = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca la base del triángulo'));
                altura = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca la altura del triángulo'));
                lado1 = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca otro lado del triángulo'));
                lado2 = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca el último lado del triángulo'));
                triangulo = new Triangulo_1.Triangulo(nombre, base, lado1, lado2);
                try {
                    triangulo.altura = altura;
                }
                catch (error) {
                    console.log(error);
                    triangulo = new Triangulo_1.Triangulo("", 0, 0, 0);
                }
                break;
            case 2:
                try {
                    let area = triangulo.area();
                    console.log(`Área del triángulo= ${area} cm2`);
                }
                catch (e) {
                    console.log("No ha entrado en la opción 1: " + e);
                }
                break;
            case 3:
                try {
                    let perimetro = triangulo.perimetro();
                    console.log(`Perímetro del triángulo= ${perimetro} cm`);
                }
                catch (e) {
                    console.log("No ha entrado en la opción 1: " + e);
                }
                break;
            case 4:
                altura = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca la altura del triángulo'));
                triangulo.altura = altura;
                break;
            case 5:
                yield database_1.db.conectarBD();
                const dSchema = {
                    _nombre: triangulo.nombre,
                    _base: triangulo.base,
                    _lado2: triangulo.lado2,
                    _lado3: triangulo.lado3,
                    _altura: triangulo.altura
                };
                const oSchema = new Triangulo_1.Triangulos(dSchema);
                // Controlamos el error de validación
                // Hay que hacer el control con then y catch 
                // Con el callback de save salta a la siguiente instrucción 
                // mientras se resuelve el callback y se desconecta y sigue el switch
                yield oSchema.save()
                    .then((doc) => console.log('Salvado Correctamente: ' + doc))
                    .catch((err) => console.log('Error: ' + err));
                // concatenando con cadena muestra sólo el mensaje
                yield database_1.db.desconectarBD();
                break;
            case 6:
                yield database_1.db.conectarBD();
                nombre = yield lecturaTeclado_1.leerTeclado('Introduzca el nombre único del triángulo');
                yield Triangulo_1.Triangulos.findOne({ _nombre: nombre }, (error, doc) => {
                    if (error)
                        console.log(error);
                    else {
                        if (doc == null)
                            console.log('No existe');
                        else {
                            console.log('Existe: ' + doc);
                            triangulo =
                                new Triangulo_1.Triangulo(doc._nombre, doc._base, doc._lado2, doc._lado3);
                            triangulo.altura = doc._altura;
                        }
                    }
                });
                yield database_1.db.desconectarBD();
                break;
            case 7:
                yield database_1.db.conectarBD();
                // Controlamos el error de validación
                // Recordar que hay que poner la opción useFindAndModify: false
                yield Triangulo_1.Triangulos.findOneAndUpdate({ _nombre: triangulo.nombre }, {
                    _nombre: triangulo.nombre,
                    _base: triangulo.base,
                    _lado2: triangulo.lado2,
                    _lado3: triangulo.lado3,
                    _altura: triangulo.altura
                }, {
                    runValidators: true // para que se ejecuten las validaciones del Schema
                })
                    .then(() => console.log('Modificado Correctamente'))
                    .catch((err) => console.log('Error: ' + err)); // concatenando con cadena muestra mensaje
                yield database_1.db.desconectarBD();
                break;
            case 8:
                yield database_1.db.conectarBD();
                yield Triangulo_1.Triangulos.findOneAndDelete({ _nombre: triangulo.nombre }, (err, doc) => {
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
            case 9:
                console.log(`Nombre: ${triangulo.nombre}`);
                console.log(`Base: ${triangulo.base}`);
                console.log(`Altura: ${triangulo.altura}`);
                console.log(`Lado 2: ${triangulo.lado2}`);
                console.log(`Lado 3: ${triangulo.lado3}`);
                break;
            case 10:
                yield database_1.db.conectarBD();
                let tmpTriangulo;
                let dTriangulo;
                query = yield Triangulo_1.Triangulos.find({});
                for (dTriangulo of query) {
                    tmpTriangulo =
                        new Triangulo_1.Triangulo(dTriangulo._nombre, dTriangulo._base, dTriangulo._lado2, dTriangulo._lado3);
                    tmpTriangulo.altura = dTriangulo._altura;
                    console.log(`Triángulo ${tmpTriangulo.nombre} Área: ${tmpTriangulo.area()}`);
                }
                yield database_1.db.desconectarBD();
                break;
            case 0:
                console.log('\n--ADIÓS--');
                break;
            default:
                console.log("Opción incorrecta");
                break;
        }
    } while (n != 0);
});
const setBD = (local) => __awaiter(void 0, void 0, void 0, function* () {
    const bdLocal = 'geometria';
    const conexionLocal = `mongodb://locadlhost/${bdLocal}`;
    if (local) {
        database_1.db.cadenaConexion = conexionLocal;
    }
    else {
        const bdAtlas = 'prueba';
        const userAtlas = yield lecturaTeclado_1.leerTeclado('Usuario BD Atlas');
        const passAtlas = yield lecturaTeclado_1.leerTeclado('Password BD Atlas');
        const conexionAtlas = `mongodb+srv://${userAtlas}:${passAtlas}@cluster0.viyli.mongodb.net/${bdAtlas}?retryWrites=true&w=majority`;
        database_1.db.cadenaConexion = conexionAtlas;
    }
});
main();
