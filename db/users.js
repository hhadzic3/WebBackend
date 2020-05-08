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
            validate:{ isIn: [["RADNIK","MENADZER","ADMINISTRATOR", "EMPLOYEE", "MENAGER", "ADMIN"]] }
            
        },
        jmbg: DataTypes.STRING,
        birth_date: DataTypes.DATE,
        adress: DataTypes.STRING,
        zip_code: DataTypes.STRING,
        mail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
          },
        phone_number: DataTypes.STRING,
        user_name:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
          }, 
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
          },
    }, {
        sequelize,
        tableName: 'users',
        timestamps: false,
        underscored: true
    }
    );
};
