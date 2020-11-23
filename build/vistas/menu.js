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
exports.menuProducto = void 0;
const lecturaTeclado_1 = require("../vistas/lecturaTeclado");
exports.menuProducto = () => __awaiter(void 0, void 0, void 0, function* () {
    let n;
    console.log('\n');
    console.log('1.- Agregar Producto');
    console.log('2.- Precio + IVA');
    console.log('3.- Salvar en BD');
    console.log('4.- Modificar Producto de la BD');
    console.log('5.- Borrar Producto de la BD');
    console.log('6.- Cargar Producto desde la BD');
    console.log('7.- Mostrar Producto');
    console.log('0.- SALIR');
    n = parseInt(yield lecturaTeclado_1.leerTeclado('--OPCIÓN--'));
    return n;
});
