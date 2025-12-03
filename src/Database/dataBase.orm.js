const { Sequelize } = require("sequelize");
const { MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE, MYSQLPORT, MYSQL_URI } = require("../keys");

let sequelize;

// Usar URI de conexión si está disponible
if (MYSQL_URI) {
    sequelize = new Sequelize(MYSQL_URI);
} else {
    // Configuración para parámetros individuales
    sequelize = new Sequelize(MYSQLDATABASE, MYSQLUSER, MYSQLPASSWORD, {
        host: MYSQLHOST,
        port: MYSQLPORT,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 1,
            acquire: 30000,
            idle: 10000
        }
    });
}

// Autenticar y sincronizar
sequelize.authenticate()
    .then(() => {
        console.log("Conexión establecida con la base de datos");
    })
    .catch((err) => {
        console.error("No se pudo conectar a la base de datos:", err.message);
    });

sequelize.sync({ force: false })
    .then(() => {
        console.log("Tablas sincronizadas");
    })
    .catch((err) => {
        console.error("Error al sincronizar las tablas:", err.message);
    });

// Exportar el objeto sequelize

const clienteModel = require('../models/cliente');
const proyectoModel = require('../models/proyecto');
const materialModel = require('../models/material');
const orden_trabajoModel = require('../models/orden_trabajo');
const personalModel = require('../models/personal');
const cotizacionModel =require('../models/cotizacion');
const pagoModel = require('../models/pago');
const clientModel = require("../models/client");
const clientDetailModel = require("../models/clientDetail");

//Sincronia
const cliente = clienteModel(sequelize,Sequelize)
const proyecto = proyectoModel(sequelize,Sequelize)
const material = materialModel (sequelize,Sequelize)
const orden_trabajo = orden_trabajoModel(sequelize,Sequelize)
const personal = personalModel(sequelize,Sequelize)
const cotizacion = cotizacionModel(sequelize,Sequelize)
const pago = pagoModel(sequelize,Sequelize)
const client = clientModel(sequelize,Sequelize)
const clientDetail = clientDetailModel(sequelize,Sequelize)


//relaciones


cliente.hasMany(proyecto)
proyecto.belongsTo(cliente)

proyecto.hasMany(material)
material.belongsTo(proyecto)

proyecto.hasMany(orden_trabajo)
orden_trabajo.belongsTo(proyecto)

personal.hasMany(orden_trabajo)
orden_trabajo.belongsTo(personal)

proyecto.hasMany(cotizacion)
cotizacion.belongsTo(proyecto)

cotizacion.hasMany(pago)
pago.belongsTo(cotizacion)


//Exportar el objeto sequelize
module.exports = {
    cliente,
    proyecto,
    material,
    orden_trabajo,
    personal,
    cotizacion,
    pago,
    client,      
    clientDetail,
};