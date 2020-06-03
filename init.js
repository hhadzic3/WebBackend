const db = require('./db/db');

function initialize() {
	db.sequelize.sync({ force: true }).then(function () {
	    dataInit().then(() => {
	        console.log("Gotovo kreiranje tabela i ubacivanje pocetnih podataka!");
	    });
	});
}

function dataInit() {
    const partsPromiseList = [
        db.parts.create({id: 1, name: 'Kocnice', availability: "DOSTUPAN"}),
        db.parts.create({id: 2, name: 'Blatobrani', availability: "DOSTUPAN"}),
        db.parts.create({id: 3, name: 'Hauba', availability: "DOSTUPAN"})
    ];
    const usersPromiseList = [
        db.users.create({id: 1,first_name: "Hamo",last_name: "Hamic",position: "RADNIK",jmbg: "1231231312313",
        birth_date: "1.1.1999",adress: "Hame polovine 12",zip_code: "71000",mail: "Hamo@gmail.com",phone_number: "061-111-111",user_name: "Hamo",password: "Hamo"}),
        db.users.create({id: 2,first_name: "Mujo", last_name: "Mujic", position: "MENADZER",jmbg: "88888882313",
        birth_date: "1.1.1999",adress: "Bakije 12",zip_code: "71000",mail: "Mujo@gmail.com",phone_number: "061-111-221",user_name: "mujo",password: "mujon"}),
        db.users.create({id: 3,first_name: "Adem", last_name: "Admic", position: "ADMINISTRATOR",jmbg: "444444444",
        birth_date: "1.1.1977",adress: "Titova 12",zip_code: "71000",mail: "Admin@gmail.com",phone_number: "064-111-221",user_name: "admin",password: "admin"}),
        db.users.create({id: 4,first_name: "Rade", last_name: "Radic", position: "RADNIK",jmbg: "111111111111",
        birth_date: "1.1.1966",adress: "Ferhadija 99",zip_code: "71000",mail: "rade@gmail.com",phone_number: "063-999-221",user_name: "rade",password: "rade"})
    ];
    const vehiclesPromiseList = [
        db.vehicles.create({id: 1,  owner_name: "Home",brand: "Mercedes",type: "TERETNO",
        serial_number: "2142412",production_year: 1999,date_of_use: '1.1.2000',previous_inspection: '3.3.2019'}),
        db.vehicles.create({id: 2,  owner_name: "Memo",brand: "BMW",type: "PUTNICKO",
        serial_number: "33312",production_year: 2016,date_of_use: '2.2.2000',previous_inspection: '5.5.2019'}),
        db.vehicles.create({id: 3,  owner_name: "Mirza",brand: "Golf 7",type: "TERETNO",
        serial_number: "44444",production_year: 2020,date_of_use: '2.2.2000',previous_inspection: '5.5.2019'}),
        db.vehicles.create({id: 4,  owner_name: "Harun",brand: "Tesla",type: "PRIKLJUCNO",
        serial_number: "99999",production_year: 2010,date_of_use: '2.2.2011',previous_inspection: '5.5.2019'}),
        db.vehicles.create({id: 5,  owner_name: "Faris",brand: "BMW X6",type: "PUTNICKO",
        serial_number: "55555",production_year: 2010,date_of_use: '2.2.2011',previous_inspection: '5.5.2019'}),
        db.vehicles.create({id: 6,  owner_name: "Kenan",brand: "Nissan",type: "PUTNICKO",
        serial_number: "6666",production_year: 2010,date_of_use: '2.2.2011',previous_inspection: '5.5.2019'}),
    ];
    const failuresPromiseList = [
        db.failures.create({id: 1, name: "motor", vehicle: 1 , accurrence_date: '2.2.2015',repair_date: null}),
        db.failures.create({id: 2, name: "kocnice", vehicle: 1, accurrence_date: '2.2.2015',repair_date: null })
    ];
    const technical_reviewsPromiseList = [
        db.technical_reviews.create( { id:1 , state:'NA PREGLEDU', kind: 'VANREDNI', responsible_person:1, vehicle:1 } ),
        db.technical_reviews.create( { id:2 , state:'ZAVRSEN', kind: 'REGULARNI', responsible_person:4, vehicle:2 } ),
        db.technical_reviews.create( { id:3 , state:'U ARHIVI', kind: 'REGULARNI', responsible_person:4, vehicle:3 } ),
        db.technical_reviews.create( { id:4 , state:'NA PREGLEDU', kind: 'PREVENTIVNI', responsible_person:1, vehicle:5 } )
    ];

    return new Promise((resolve, reject) => {
        Promise.all(usersPromiseList)
            .then(() => Promise.all(technical_reviewsPromiseList).then(all => resolve(all))) 
            .then(() => Promise.all(partsPromiseList).then(all => resolve(all)))
            .then(() => Promise.all(vehiclesPromiseList).then(all => resolve(all)))
            .then(() => Promise.all(failuresPromiseList).then(all => resolve(all)))
            .catch(reason => reject(reason));
    });
}

exports.initialize = initialize;
