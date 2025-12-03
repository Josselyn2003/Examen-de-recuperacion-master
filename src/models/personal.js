const personal = (sequelize, type) => {
    return sequelize.define('personales', {
        id_personal: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_personal : type.STRING,
        especialidad : type.STRING,
        telefono_personal : type.STRING,
        costo_hora : type.STRING, 

        crearPersonal:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizarPersonal: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }, {
        timestamps: false,
    });
}
module.exports = personal