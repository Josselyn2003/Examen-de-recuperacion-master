const material = (sequelize, type) => {
    return sequelize.define('materiales', {
        id_material: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_material: type.STRING,
        cantidad:type.STRING,
        costo_unitario: type.STRING, 

        crearMaterial:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizarMaterial: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }, {
        timestamps: false,
    });
}
module.exports = material