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
                isIn: [['NA PREGLEDU', 'ZAVRSEN', 'U ARHIVI', 'IN_PROGRESS', 'DONE', 'IN_ARCHIVE']]
            }
        },
        kind: {
            type: Sequelize.STRING,
            validate: {
                isIn: [[ 'REGULARNI', 'PREVENTIVNI','VANREDNI', 'REGULAR', 'PREVENTIVE', 'EXTRAORDINARY']]
            }
        },
        responsible_person: DataTypes.INTEGER,
        vehicle: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
          },
    }, {
        sequelize,
        tableName: 'technical_reviews',
        timestamps: false,
        underscored: true
    });
};
