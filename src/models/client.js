const client = (sequelize, type) => {
    return sequelize.define('client', {
        idClient: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nameClient: type.STRING,
        lastNameClient: type.STRING,
        typeIdentificationClient: type.STRING,
        identificationCardClient: type.STRING,
        emailClient: type.STRING,
        phoneClient: type.STRING,
        usernameClient: type.STRING,
        passwordClient: type.STRING,
        stateClient: type.STRING
    }, {
        tableName: 'client',
        timestamps: false,
    });
};

module.exports = client;
