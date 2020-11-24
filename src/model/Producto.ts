import {Schema, model } from 'mongoose'

export class Producto{
    private _nombre: string
    private _precio: number
    private _tipo: string
    private _cantidad: number
    private _caducidad: Date

    constructor(_nombre: string, _precio : number, _tipo : string, _cantidad: number, _caducidad : Date
        ){
        this._nombre = _nombre
        this._precio = _precio
        this._tipo = _tipo
        this._cantidad = _cantidad
        this._caducidad = _caducidad
    }
    get nombre(){
        return this._nombre
    }

    get precio(){
        return this._precio
    }

    get tipo(){
        return this._tipo
    }
    get cantidad(){
        return this._cantidad
    }

    get caducidad(){
        return this._caducidad
    }

    iva(){
        if (this._tipo == "alimentacion"){ 
            return this._precio*0.21+this._precio*this._cantidad
        }
        
        if (this._tipo == "sanitario"){   
            return this._precio*0.04+this._precio*this._cantidad
        }
    }
    
    dias(){
        let miliseconds = this._caducidad.getTime() - new Date().getTime()
        let dias = miliseconds/86400000 
        let calc = Math.floor(dias)
        return calc
    }
}

// Definimos el type

export type tProducto = {
    _nombre: string,
    _precio: number,
    _tipo: string,
    _cantidad: number,
    _caducidad: Date,
    _precio_iva: number
}

// Definimos el Schema
const productoSchema = new Schema({
    _nombre: {
        type: String,
        unique: false
    },
    _precio: {
        type: Number,
        min: 0.1
    },
    _tipo: String,
    _cantidad:{
        type: Number,
        min: 1
    },
    _caducidad: {
        type: Date,
        min: new Date()
    }
})
export const Productos = model('productos', productoSchema)
