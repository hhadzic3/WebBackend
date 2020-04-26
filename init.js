const db = require('./db/db');

db.sequelize.sync({ force: true }).then(function () {
    dataInit().then(() => {
        console.log("Gotovo kreiranje tabela i ubacivanje pocetnih podataka!");
        process.exit();
    });
});

function dataInit() {
    const paPromiseList = [
        db.parts.create({id: 1, naziv: 'Kocnice'}),
        db.parts.create({id: 2, naziv: 'Blatobrani'}),
        db.parts.create({id: 3, naziv: 'Hauba'})
    ];
    const usersPromiseList = [
        db.users.create({id: 1,ime: "Hamo",prezime: "Hamic",uloga: "radnik",jmbg: "1231231312313",datum_rodjenja: "1.1.1999",adresa: "Hame polovine 12",postanski_broj: "71000",mail: "Hamo@gmail.com",broj_telefona: "061-111-111",naziv: "Hamo",lozinka: "Hamo"}),
        db.users.create({id: 2,ime: "Mujo",prezime: "Mujic",uloga: "menadzer",jmbg: "88888882313",datum_rodjenja: "1.1.1999",adresa: "Bakije 12",postanski_broj: "71000",mail: "Mujo@gmail.com",broj_telefona: "061-111-221",naziv: "mujo",lozinka: "mujon"})
    ];
    const vehiclesPromiseList = [
        db.vehicles.create({id: 1,  naziv_vlasnika: "Hamo",marka: "Mercedes",tip: "teretno",
        serijski_broj: "2142412",godina_proizvodnje: 1999,datum_upotrebe: '1.1.2000',prethodna_inspekcija: '3.3.2019'}),
        db.vehicles.create({id: 2,  naziv_vlasnika: "Memo",marka: "BMW",tip: "putnicko",
        serijski_broj: "33312",godina_proizvodnje: 2016,datum_upotrebe: '2.2.2000',prethodna_inspekcija: '5.5.2019'})
    ];
    const failuresPromiseList = [
        db.failures.create({id: 1,  naziv: "motor",vozilo: 1}),
        db.failures.create({id: 2,  naziv: "kocnice",vozilo: 1})
    ];
    const technical_reviewsPromiseList = [
        db.technical_reviews.create({id: 1,stanje: "zavrsen", vrsta: "vanredni" ,odgovorna_osoba:1, vozilo:1 } )  
    ];

    return new Promise((resolve, reject) => {
        Promise.all(usersPromiseList)
            .then(() => Promise.all(partsPromiseList).then(all => resolve(all)))
            .then(() => Promise.all(technical_reviewsPromiseList).then(all => resolve(all)))
            .then(() => Promise.all(vehiclesPromiseList).then(all => resolve(all)))
            .then(() => Promise.all(failuresPromiseList).then(all => resolve(all)))
            .catch(reason => reject(reason));
    });
}

