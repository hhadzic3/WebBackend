const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('vozila', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        owner_name: DataTypes.STRING,
        brand: DataTypes.STRING,
        tip: {
            type: Sequelize.STRING,
            validate: {
                isIn: [["putnicko", "teretno","prikljucno"]]
            }
        },
        serial_number: DataTypes.STRING,
        production_year: DataTypes.INTEGER,
        date_of_use: DataTypes.DATE,
        previous_inspection: DataTypes.DATE
    }, {
        sequelize,
        tableName: 'vozila',
        underscored: true,
        timestamps: false
    });
};
