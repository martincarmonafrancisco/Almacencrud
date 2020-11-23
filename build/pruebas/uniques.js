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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
// Atención con el modificador useCreateIndex: true 
// se crea un índice para el campo name llamado name_1
exports.connect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect('mongodb://localhost/test', {
            useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
        });
    }
    catch (err) {
        throw 'Error: ' + err;
    }
});
exports.disconnect = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.disconnect();
});
// Empieza el ejemplo:
const schema = new mongoose_2.Schema({
    name: { type: String, unique: true }
});
const Model = mongoose_2.model('Test', schema);
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.connect();
        let oSchema = new Model({ name: 'Val2' });
        yield oSchema.save()
            .then(() => {
            console.log('Correcto');
        })
            .catch((err) => {
            console.log('Error al salvar: ' + err); // concatenando con una cadena solo sale el mensaje
        });
        yield exports.disconnect();
    }
    catch (err) {
        console.log(err);
    }
});
main();
