const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('korisnici', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        firs name: DataTypes.STRING,
        last name: DataTypes.STRING,
        position: {
            type: Sequelize.STRING,
            validate:{ isIn: [["radnik","menadzer","administrator"]] }
            
        },
        jmbg: DataTypes.STRING,
        date_of_birth: DataTypes.DATE,
        adress: DataTypes.STRING,
        zip_code: DataTypes.STRING,
        mail: DataTypes.STRING,
        number_phone: DataTypes.STRING,
        name: DataTypes.STRING,
        password: DataTypes.STRING,
    }, {
        sequelize,
        tableName: 'korisnici',
        timestamps: false,
        underscored: true
    });
};
