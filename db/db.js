const Sequelize = require('sequelize');
const sequelize = new Sequelize('DBINSPECTION', 'root', 'root', {host: '127.0.0.1', dialect: 'mysql', logging: false});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Op = Sequelize.Op;

// Import modela
db.parts = sequelize.import(__dirname + '/dijelovi.js');
db.users = sequelize.import(__dirname + '/korisnici.js');
db.failures = sequelize.import(__dirname + '/kvarovi.js');
db.technical_reviews = sequelize.import(__dirname + '/tehnicki_pregledi.js');
db.vehicles = sequelize.import(__dirname + '/vozila.js');

// Definisanje relacija

// Korisnik <--> Pregled
db.users.hasOne(db.technical_reviews, {foreignKey: {name: 'odgovorna_osoba'}});
db.technical_reviews.belongsTo(db.users, {as: 'zaduzenaOsobaa', foreignKey: {name: 'odgovorna_osoba'}});
// Vozilo <--> Pregledi
db.vehicles.hasMany(db.technical_reviews, {foreignKey: {name: 'vozilo'}});
db.technical_reviews.belongsTo(db.vehicles, {as: 'zaduzenoVozilo', foreignKey: {name: 'vozilo'}});
// Vozilo <--> Kvarovi
db.vehicles.hasMany(db.kvarovi, {foreignKey: {name: 'vozilo'}});
db.failures.belongsTo(db.vozila, {as: 'kvaroviVozila', foreignKey: {name: 'vozilo'}});

module.exports = db;
