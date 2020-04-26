const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('kvarovi', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        vehicle: DataTypes.INTEGER
    }, {
        sequelize,
        tableName: 'kvarovi',
        timestamps: false,
        underscored: true
    });
};
