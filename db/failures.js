const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('failures', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        vehicle: DataTypes.INTEGER,
        accurrence_date: DataTypes.DATE,
        repair_date: DataTypes.DATE
    }, {
        sequelize,
        tableName: 'failures',
        timestamps: false,
        underscored: true
    });
};
