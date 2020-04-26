const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        position: {
            type: Sequelize.STRING,
            validate:{ isIn: [["radnik","menadzer","administrator"]] }
            
        },
        jmbg: DataTypes.STRING,
        birth_date: DataTypes.DATE,
        adress: DataTypes.STRING,
        zip_code: DataTypes.STRING,
        mail: DataTypes.STRING,
        phone_number: DataTypes.STRING,
        user_name:Sequelize.STRING, // todo: dodati validaciju za UNIQUE
        password: Sequelize.STRING,
           
    }, {
        sequelize,
        tableName: 'users',
        timestamps: false,
        underscored: true
    }
    );
};
