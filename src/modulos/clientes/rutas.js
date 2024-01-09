const express = require('express');
const respuesta = require('../../red/respuestas');
const controlador = require('./controlador');

function configurarRutas(router) {
    router.get('/', async function(req, res) {
        try {
            const todos = await controlador.todos();
            respuesta.success(req, res, todos, 200);
        } catch (error) {
            respuesta.error(req, res, `Error al obtener todos los elementos: ${error.message}`, 500);
        }
    });

    router.get('/:id', async function(req, res) {
        try {
            const id = req.params.id;
            console.log('ID recibido:', id); // Agrega esta línea para imprimir el ID en la consola
            const cliente = await controlador.uno(id);
            respuesta.success(req, res, cliente, 200);
        } catch (error) {
            respuesta.error(req, res, `Error al obtener el elemento: ${error.message}`, 500);
        }
    });

    router.post('/', async function(req, res) {
        try {
            const nuevoElemento = await controlador.agregar(req.body);
            respuesta.success(req, res, nuevoElemento, 201);
        } catch (error) {
            respuesta.error(req, res, `Error al agregar un elemento: ${error.message}`, 500);
        }
    });

    router.put('/:id', async function(req, res) {
        try {
            const id = req.params.id;
            const datosActualizados = await controlador.actualizar(id, req.body);
            respuesta.success(req, res, datosActualizados, 200);
        } catch (error) {
            respuesta.error(req, res, `Error al actualizar un elemento: ${error.message}`, 500);
        }
    });

    router.delete('/:id', async function(req, res) {
        try {
            const id = req.params.id;
            const resultado = await controlador.eliminar(id);
            respuesta.success(req, res, resultado, 200);
        } catch (error) {
            respuesta.error(req, res, `Error al eliminar un elemento: ${error.message}`, 500);
        }
    });

    return router;
}

module.exports = configurarRutas;
