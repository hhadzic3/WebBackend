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
        availability: DataTypes.INTEGER
    }, {
        sequelize,
        tableName: 'parts',
        timestamps: false,
        underscored: true
    });
};
