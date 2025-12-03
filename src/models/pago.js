const pago = (sequelize, type) => {
    return sequelize.define('pagos', {
        id_pago: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fecha_pago : type.STRING, 
        monto : type.STRING, 
        metodo_pago : type.STRING,

        crearPago:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizarPago: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }, {
        timestamps: false,
    });
}
module.exports = pago