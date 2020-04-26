const Sequelize = require('sequelize');
const sequelize = new Sequelize('DBINSPECTION', 'root', 'root', {host: '127.0.0.1', dialect: 'mysql', logging: false});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Op = Sequelize.Op;

// Import modela
db.parts = sequelize.import(__dirname + '/parts.js');
db.users = sequelize.import(__dirname + '/users.js');
db.failures = sequelize.import(__dirname + '/failures.js');
db.technical_reviews = sequelize.import(__dirname + '/technical_reviews.js');
db.vehicles = sequelize.import(__dirname + '/vehicles.js');

// Definisanje relacija

// Korisnik <--> Pregled
db.users.hasOne(db.technical_reviews, {foreignKey: {name: 'responsible_person'}});
db.technical_reviews.belongsTo(db.users, {as: 'responsiblePerson', foreignKey: {name: 'responsible_person'}});
// Vozilo <--> Pregledi
db.vehicles.hasMany(db.technical_reviews, {foreignKey: {name: 'vehicle'}});
db.technical_reviews.belongsTo(db.vehicles, {as: 'vehicleInUse', foreignKey: {name: 'vehicle'}});
// Vozilo <--> Kvarovi
db.vehicles.hasMany(db.failures, {foreignKey: {name: 'vehicle'}});
db.failures.belongsTo(db.vehicles, {as: 'vehicleFailures', foreignKey: {name: 'vehicle'}});

module.exports = db;
