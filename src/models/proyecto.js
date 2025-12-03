const proyecto = (sequelize, type) => {
    return sequelize.define('proyectos', {
        id_proyecto: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_proyecto : type.STRING,
        tipo : type.STRING,
        fecha_inicio : type.STRING,
        fecha_fin : type.STRING,
        estado : type.STRING,
        descripcion_proyecto : type.STRING, 

        crearProyecto:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizarProyecto: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }, {
        timestamps: false,
    });
}
module.exports = proyecto