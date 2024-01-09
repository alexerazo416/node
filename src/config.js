// config.js
module.exports = {
    app: {
        port: process.env.PORT || 4000,
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: 'ejemplo',  // Cambia 'root' por 'ejemplo'
        password: '',  // La contraseña es una cadena vacía según tu configuración
        database: process.env.MYSQL_DB || 'ejemplo',
        port: process.env.MYSQL_PORT || 3307,
    }
};
