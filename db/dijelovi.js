const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('dijelovi', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        naziv: DataTypes.STRING,
    }, {
        sequelize,
        tableName: 'dijelovi',
        timestamps: false,
        underscored: true
    });
};
