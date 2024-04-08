const mongoose = require('mongoose');

const empleadoEsquema = new mongoose.Schema({
    nombre : String,
    telefono : Number,
    direccion : String,
    salario : Number,
    cargo : String
    
    /*
    titulo : String,
    descripcion : String,
    prioridad : Number*/
})

const TareaModel = mongoose.model('Empleado',empleadoEsquema,'empleado');
module.exports = TareaModel;