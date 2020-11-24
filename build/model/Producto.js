"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Productos = exports.Producto = void 0;
const mongoose_1 = require("mongoose");
class Producto {
    constructor(_nombre, _precio, _tipo, _cantidad, _caducidad) {
        this._nombre = _nombre;
        this._precio = _precio;
        this._tipo = _tipo;
        this._cantidad = _cantidad;
        this._caducidad = _caducidad;
    }
    get nombre() {
        return this._nombre;
    }
    get precio() {
        return this._precio;
    }
    get tipo() {
        return this._tipo;
    }
    get cantidad() {
        return this._cantidad;
    }
    get caducidad() {
        return this._caducidad;
    }
    iva() {
        if (this._tipo == "alimentacion") {
            return this._precio * 0.21 + this._precio * this._cantidad;
        }
        if (this._tipo == "sanitario") {
            return this._precio * 0.04 + this._precio * this._cantidad;
        }
    }
    dias() {
        let miliseconds = this._caducidad.getTime() - new Date().getTime();
        let dias = miliseconds / 86400000;
        let calc = Math.floor(dias);
        return calc;
    }
}
exports.Producto = Producto;
// Definimos el Schema
const productoSchema = new mongoose_1.Schema({
    _nombre: {
        type: String,
        unique: false
    },
    _precio: {
        type: Number,
        min: 0.1
    },
    _tipo: String,
    _cantidad: {
        type: Number,
        min: 1
    },
    _caducidad: {
        type: Date,
        min: new Date("2020-11-25")
    }
});
exports.Productos = mongoose_1.model('productos', productoSchema);
