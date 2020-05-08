const db = require('./db/db');

db.sequelize.sync({ force: true }).then(function () {
    dataInit().then(() => {
        console.log("Gotovo kreiranje tabela i ubacivanje pocetnih podataka!");
        process.exit();
    });
});

function dataInit() {
    const partsPromiseList = [
        db.parts.create({id: 1, name: 'Kocnice', availability: true}),
        db.parts.create({id: 2, name: 'Blatobrani', availability: false}),
        db.parts.create({id: 3, name: 'Hauba', availability: true})
    ];
    const usersPromiseList = [
        db.users.create({id: 1,first_name: "Hamo",last_name: "Hamic",position: "radnik",jmbg: "1231231312313",
        birth_date: "1.1.1999",adress: "Hame polovine 12",zip_code: "71000",mail: "Hamo@gmail.com",phone_number: "061-111-111",user_name: "Hamo",password: "Hamo"}),
        db.users.create({id: 2,first_name: "Mujo", last_name: "Mujic", position: "menadzer",jmbg: "88888882313",
        birth_date: "1.1.1999",adress: "Bakije 12",zip_code: "71000",mail: "Mujo@gmail.com",phone_number: "061-111-221",user_name: "mujo",password: "mujon"})
    ];
    const vehiclesPromiseList = [
        db.vehicles.create({id: 1,  owner_name: "Hamo",brand: "Mercedes",type: "TERETNO",
        serial_number: "2142412",production_year: 1999,date_of_use: '1.1.2000',previous_inspection: '3.3.2019'}),
        db.vehicles.create({id: 2,  owner_name: "Memo",brand: "BMW",type: "PUTNICKO",
        serial_number: "33312",production_year: 2016,date_of_use: '2.2.2000',previous_inspection: '5.5.2019'})
    ];
    const failuresPromiseList = [
        db.failures.create({id: 1, name: "motor", vehicle: 1 , accurrence_date: '2.2.2015',repair_date: null}),
        db.failures.create({id: 2, name: "kocnice", vehicle: 1, accurrence_date: '2.2.2015',repair_date: null })
    ];
    const technical_reviewsPromiseList = [
        db.technical_reviews.create( { id:1 , state:"na pregledu", kind: "vanredni", responsible_person:1, vehicle:1 } )
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

