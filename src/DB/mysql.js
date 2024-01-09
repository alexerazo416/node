// En el archivo mysql.js
const mysql = require('mysql2');
const config = require('../config');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
};

const pool = mysql.createPool(dbconfig);

function conMysql() {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log('[db err]', err);
            setTimeout(conMysql, 200);
        } else {
            console.log('DB Conectada!!!');
            connection.release(); // Importante liberar la conexión después de usarla
        }
    });

    pool.on('error', (err) => {
        console.log('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            conMysql();
        } else {
            throw err;
        }
    });
}

function todos(tabla) {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM ${tabla}`, (err, resultados) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(resultados);
        });
    });
}

async function uno(tabla, id) {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM ${tabla} WHERE id = ?`, [id], (err, resultados) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(resultados[0]);  // Devuelve el primer resultado, ya que debería ser único
        });
    });
}

async function agregar(tabla, data) {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO ${tabla} SET ?`, [data], (err, resultados) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(resultados.insertId);
        });
    });
}

async function eliminar(tabla, id) {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM ${tabla} WHERE id = ?`, [id], (err, resultados) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(resultados.affectedRows > 0);
        });
    });
}

async function actualizar(tabla, id, nuevosDatos) {
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE ${tabla} SET ? WHERE id = ?`, [nuevosDatos, id], (err, resultados) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(resultados.affectedRows > 0);
        });
    });
}

module.exports = {
    todos,
    uno,
    agregar,
    eliminar,
    actualizar 
};

conMysql(); // Agrega esta línea para iniciar la conexión al cargar el módulo
