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
        naziv: DataTypes.STRING,
        vozilo: DataTypes.INTEGER
    }, {
        sequelize,
        tableName: 'kvarovi',
        timestamps: false,
        underscored: true
    });
};
