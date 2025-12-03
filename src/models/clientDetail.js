const clientDetail = (sequelize, type) => {
    return sequelize.define('clientDetail', {
        idClientDetail: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        clientIdClient: type.INTEGER,
        generIdGener: type.INTEGER,
        typePersonIdTypePerson: type.INTEGER
    }, {
        tableName: 'clientDetail',
        timestamps: false,
    });
};

module.exports = clientDetail;
