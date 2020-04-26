const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/db');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/pocetna.html');
});

// ************************************ GET:
app.get('/parts', (req, res) => db.dijelovi.findAll().then(dijelovi => res.json(parts)));
app.get('/users', (req, res) => db.korisnici.findAll().then(korisnici => res.json(users)));
app.get('/vehicles', (req, res) => db.vozila.findAll().then(vozila => res.json(vehicles)));
app.get('/technical_reviews', (req, res) => db.tehnicki_pregledi.findAll().then(technical_reviews => res.json(technical_reviews)));
app.get('/failures', (req, res) => db.failures.findAll().then(failures => res.json(failures)));
app.get('/technical_reviews/:id' , (req, res) =>  db.tehnicki_pregledi.finfOne({
    where: {   id: req.params.id }})   
);
app.get('/users/:id' , (req, res) =>  db.users.finfOne({
    where: {   id: req.params.id }})   
);

//  ****************************************** DELETE:
app.delete('/deleteParts/:id' , (req, res) => db.parts.destroy({
    where: {   id: req.params.id     }
 }).then(function(rowDeleted){ 
   if(rowDeleted === 1){ console.log('Deleted successfully'); }}).then( () => { res.json({ status : 'Deleted!'}) })  
);

app.delete('/deleteUsers/:id' , (req, res) =>  db.users.destroy({
    where: {   id: req.params.id    }
 }).then(function(rowDeleted){ 
   if(rowDeleted === 1){
      console.log('Deleted successfully');
    }}, function(err){ console.log(err); }).then( () => { res.json({ status : 'Deleted!'}) })  
);

app.delete('/deleteFailures/:id' , (req, res) =>  db.failures.destroy({
    where: {   id: req.params.id }
 }).then(function(rowDeleted){ 
   if(rowDeleted === 1){
      console.log('Deleted successfully');
    }}, function(err){console.log(err); }).then( () => { res.json({ status : 'Deleted!'}) })
);

app.delete('/deleteTechnical_reviews/:id' , (req, res) =>  db.technical_reviews.destroy({
    where: {   id: req.params.id }
 }).then(function(rowDeleted){ 
   if(rowDeleted === 1){
      console.log('Deleted successfully');
    }}, function(err){console.log(err);  })  .then( () => { res.json({ status : 'Deleted!'}) }) 
);
app.delete('/deleteVehicles/:id' , (req, res) =>  db.vehicles.destroy({
    where: {   id: req.params.id}
 }).then(function(rowDeleted){ 
   if(rowDeleted === 1){console.log('Deleted successfully');}}, function(err){console.log(err); 
}).then( () => { res.json({ status : 'Deleted!'}) })
);

// ****************************************** POST:
app.post('/addUsers' , function(req, res)  {
    if ( !req.body.naziv )
        res.json({ error: 'Bad Data' })
    
    db.users.create(req.body).then( data => { res.send(data) });
});
app.post('/addReviews' , function(req, res)  {
    if ( !req.body.stanje )
        res.json({ error: 'Bad Data' })
    
    db.technical_reviews.create(req.body).then( data => { res.send(data) });
});
app.post('/addParts' , function(req, res)  {
    if ( !req.body.naziv )
        res.json({ error: 'Bad Data'})
    
    db.parts.create(req.body).then( data => { res.send(data) });
});
app.post('/addVehicles' , function(req, res)  {
    if ( !req.body.naziv_vlasnika )
        res.json({ error: 'Bad Data' })
    
    db.vehicles.create(req.body).then( data => { res.send(data) });
});
app.post('/addFailures' , function(req, res)  {
    if ( !req.body )
        res.json({ error:'Bad Data' })
    
    db.failures.create(req.body).then( data => { res.send(data) });
});

// ********************************************** PUT:
app.put('/editVehicles/:id' , function(req, res)  {
    if ( !req.body.brand )
        res.json({ error: 'Bad Data' })
        
    var v = req.body;
    db.vehicles.update( {
        owner_name: v.owner_name,
        brand: v.brand,
        type: v.type,
        serial_number: v.serial_number,
        production_year: v.production_year,
        date_of_use: v.date_of_use,
        previous_inspection: v.previous_inspection
    }, { where: { id: req.params.id } }
    ).then( () => { res.json({ status : 'Updated!'}) });
});

app.put('/editReview/:id' , function(req, res)  {
    if ( !req.body.state )
        res.json({ error: 'Bad Data' })
    
    var v = req.body;
    db.technical_reviews.update({
        state: v.state, kind: v.kind ,
        responsible_person:v.responsible_person,
        vehicle:v.vehicle
    }, { where: { id: req.params.id } }
    ).then( () => { res.json({ status : 'Updated!'}) });
});


module.exports = app.listen(8080, () => {
    console.log('Server radi...');
});