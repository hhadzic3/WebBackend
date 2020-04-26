const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('korisnici', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true
        },
        ime: DataTypes.STRING,
        prezime: DataTypes.STRING,
        uloga: {
            type: Sequelize.STRING,
            validate:{ isIn: [["radnik","menadzer","administrator"]] }
            
        },
        jmbg: DataTypes.STRING,
        datum_rodjenja: DataTypes.DATE,
        adresa: DataTypes.STRING,
        postanski_broj: DataTypes.STRING,
        mail: DataTypes.STRING,
        broj_telefona: DataTypes.STRING,
        naziv: DataTypes.STRING,
        lozinka: DataTypes.STRING,
    }, {
        sequelize,
        tableName: 'korisnici',
        timestamps: false,
        underscored: true
    });
};
