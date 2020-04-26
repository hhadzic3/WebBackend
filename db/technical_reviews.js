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
        state: {
            type: Sequelize.STRING,
            validate: {
                isIn: [["na pregledu", "zavrsen","arhiviran"]]
            }
        },
        kind: {
            type: Sequelize.STRING,
            validate: {
                isIn: [[ "redovni", 'vanredni','preventivni' ]]
            }
        },
        responsible_person: DataTypes.INTEGER,
        vehicle: DataTypes.INTEGER
    }, {
        sequelize,
        tableName: 'tehnicki_pregledi',
        timestamps: false,
        underscored: true
    });
};
