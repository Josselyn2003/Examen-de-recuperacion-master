const cotizacion = (sequelize, type) => {
    return sequelize.define('cotizaciones', {
        id_cotizacion: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fecha_cotizacion: type.STRING,
        total: type.STRING,
        estado_cotizacion:type.STRING, 
         

        crearCotizacion:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizarCotizacion: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }, {
        timestamps: false,
    });
}
module.exports = cotizacion