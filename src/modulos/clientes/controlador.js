// En el controlador.js
const db = require('../../DB/mysql');
const TABLA = 'clientes';

function todos() {
    return db.todos(TABLA);
}

async function uno(id) {
    try {
        console.log('Buscando el elemento con id:', id);
        const numeroId = parseInt(id, 10); // Convertir a número
        const resultados = await db.uno(TABLA, numeroId);
        console.log('Resultados:', resultados);
        if (resultados && resultados.length > 0) {
            return resultados[0];
        } else {
            throw new Error('Elemento no encontrado');
        }
    } catch (error) {
        throw error;
    }
}

async function agregar(nuevoCliente) {
    try {
        const resultado = await db.agregar(TABLA, nuevoCliente);
        return resultado;  // Devuelve el resultado de la inserción
    } catch (error) {
        throw error;  // Lanza el error para que sea manejado en el enrutador
    }
}

async function actualizar(id, nuevosDatos) {
    try {
        const resultado = await db.actualizar(TABLA, id, nuevosDatos);
        return resultado;  // Devuelve el resultado de la actualización
    } catch (error) {
        throw error;  // Lanza el error para que sea manejado en el enrutador
    }
}

async function eliminar(id) {
    try {
        const resultado = await db.eliminar(TABLA, id);
        return resultado;  // Devuelve el resultado de la eliminación
    } catch (error) {
        throw error;  // Lanza el error para que sea manejado en el enrutador
    }
}

module.exports = {
    todos,
    uno,
    agregar,
    actualizar,
    eliminar
};
