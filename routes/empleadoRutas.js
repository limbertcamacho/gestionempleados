const express = require('express');
const rutas = express.Router();
const TareaModel = require('../models/Empleado');

rutas.get('/', async (req, res) =>{
    try {
        const empleados = await TareaModel.find();
        // console.log(tareas);
        res.json(empleados);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});

rutas.post('/agregar', async (req, res) =>{
    // console.log(req.body);
    const nuevaEmpleado = new TareaModel({

        nombre : req.body.nombre,
        telefono : req.body.telefono,
        direccion : req.body.direccion,
        salario : req.body.salario,
        cargo : req.body.cargo
        /*titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        prioridad: req.body.prioridad*/
    });
    try {
        const guardarEmpleado = await nuevaEmpleado.save();
        res.status(201).json(guardarEmpleado);
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});

rutas.put('/editar/:id', async (req, res) =>{
    try {
        const actualizarEmpleado = await TareaModel.findByIdAndUpdate(req.params.id, req.body, { new: true});
        res.status(201).json(actualizarEmpleado);
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});

rutas.delete('/eliminar/:id', async (req, res) =>{
    try {
        const eliminarEmpleado = await TareaModel.findByIdAndDelete(req.params.id);
        res.json({mensaje: 'Empleado eliminado correctamente'});
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});

//consultas ----------------------
// - Ordenar  los empleados  por nombre de forma ascendente
rutas.get('/ordenar-empleados', async (req, res) =>{
    try {
        const tareasASC = await TareaModel.find().sort({nombre: 1});
        res.json(tareasASC);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});
// - Eliminar empleado por CI o ID
rutas.delete('/eliminar-empleado/:_id', async (req, res) =>{
    try {
        console.log(req.params._id);
        const _id = req.params._id
        const eliminarTareas = await TareaModel.deleteMany({_id});
        res.json({mensaje: 'Empleado eliminado correctamente'});
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});
// - Verificar registro del empleado  mas reciente añadida a la base de datos
rutas.get('/registro-reciente', async (req, res) =>{
    try {
        const tarea = await TareaModel.findOne().sort({_id: -1});
        res.json(tarea);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});
module.exports = rutas;
