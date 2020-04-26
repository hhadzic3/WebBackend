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
        naziv_vlasnika: DataTypes.STRING,
        marka: DataTypes.STRING,
        tip: {
            type: Sequelize.STRING,
            validate: {
                isIn: [["putnicko", "teretno","prikljucno"]]
            }
        },
        serijski_broj: DataTypes.STRING,
        godina_proizvodnje: DataTypes.INTEGER,
        datum_upotrebe: DataTypes.DATE,
        prethodna_inspekcija: DataTypes.DATE
    }, {
        sequelize,
        tableName: 'vozila',
        underscored: true,
        timestamps: false
    });
};
