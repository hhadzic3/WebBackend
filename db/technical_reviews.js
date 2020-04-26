const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('technical_reviews', {
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
        tableName: 'technical_reviews',
        timestamps: false,
        underscored: true
    });
};
