const cliente = (sequelize, type) => {
    return sequelize.define('clientes', {
        id_cliente: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cedula:type.STRING,
        nombre:type.STRING, 
        telefono:type.STRING, 
        correoelectronico:type.STRING,
        direccion:type.STRING,
         

        crearCliente:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizarCliente: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }, {
        timestamps: false,
    });
}
module.exports = cliente