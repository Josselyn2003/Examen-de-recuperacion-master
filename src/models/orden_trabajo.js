const orden_trabajo = (sequelize, type) => {
    return sequelize.define('orden_trabajos', {
        id_orden_trabajo: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion : type.STRING,
        fecha : type.STRING,
        horas_trabajo : type.STRING,
        costo_total : type.STRING, 

        crearOrden_trabajo:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizarOrden_trabajo: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }, {
        timestamps: false,
    });
}
module.exports = orden_trabajo