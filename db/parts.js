const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('parts', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        availability: {
            type: Sequelize.STRING,
            validate:{ isIn: [["AVAILABLE","UNAVAILABLE", "DOSTUPAN", "NEDOSTUPAN"]] }
        },
    }, {
        sequelize,
        tableName: 'parts',
        timestamps: false,
        underscored: true
    });
};
