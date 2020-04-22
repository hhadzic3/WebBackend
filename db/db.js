const Sequelize = require('sequelize');
const sequelize = new Sequelize('DBINSPECTION', 'root', 'root', {host: '127.0.0.1', dialect: 'mysql', logging: false});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Op = Sequelize.Op;

// Import modela
db.dijelovi = sequelize.import(__dirname + '/dijelovi.js');
db.korisnici = sequelize.import(__dirname + '/korisnici.js');
db.kvarovi = sequelize.import(__dirname + '/kvarovi.js');
db.tehnicki_pregledi = sequelize.import(__dirname + '/tehnicki_pregledi.js');
db.vozila = sequelize.import(__dirname + '/vozila.js');

// Definisanje relacija

// Korisnik <--> Pregled
db.korisnici.hasOne(db.tehnicki_pregledi, {foreignKey: {name: 'odgovorna_osoba'}});
db.tehnicki_pregledi.belongsTo(db.korisnici, {as: 'zaduzenaOsobaa', foreignKey: {name: 'odgovorna_osoba'}});
// Vozilo <--> Pregledi
db.vozila.hasMany(db.tehnicki_pregledi, {foreignKey: {name: 'vozilo'}});
db.tehnicki_pregledi.belongsTo(db.vozila, {as: 'zaduzenoVozilo', foreignKey: {name: 'vozilo'}});
// Vozilo <--> Kvarovi
db.vozila.hasMany(db.kvarovi, {foreignKey: {name: 'vozilo'}});
db.kvarovi.belongsTo(db.vozila, {as: 'kvaroviVozila', foreignKey: {name: 'vozilo'}});

module.exports = db;
