const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('tehnicki_pregledi', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        stanje: {
            type: Sequelize.STRING,
            validate: {
                isIn: [["na pregledu", "zavrsen","arhiviran"]]
            }
        },
        vrsta: {
            type: Sequelize.STRING,
            validate: {
                isIn: [[ "redovni", 'vanredni','preventivni' ]]
            }
        },
        odgovorna_osoba: DataTypes.INTEGER,
        vozilo: DataTypes.INTEGER
    }, {
        sequelize,
        tableName: 'tehnicki_pregledi',
        timestamps: false,
        underscored: true
    });
};
