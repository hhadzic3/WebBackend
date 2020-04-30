const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/db');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api', function (req, res) {
    res.sendFile(__dirname + '/api.html');
});

// ************************************ GET:
app.get('/api/parts', (req, res) => db.parts.findAll().then(parts => res.json(parts)));
app.get('/api/users', (req, res) => db.users.findAll().then(users => res.json(users)));
app.get('/api/vehicles', (req, res) => db.vehicles.findAll().then(vehicles => res.json(vehicles)));
app.get('/api/technical_reviews', (req, res) => db.technical_reviews.findAll().then(technical_reviews => res.json(technical_reviews)));
app.get('/api/failures', (req, res) => db.failures.findAll().then(failures => res.json(failures)));
app.get('/api/technical_reviews/:id' , (req, res) =>  db.technical_reviews.finfOne({
    where: {   id: req.params.id }})   
);
app.get('/api/users/:id' , (req, res) =>  db.users.finfOne({
    where: {   id: req.params.id }})   
);

//  ****************************************** DELETE:
app.delete('/api/parts/:id' , (req, res) => db.parts.destroy({
    where: {   id: req.params.id     }
 }).then(function(rowDeleted){ 
   if(rowDeleted === 1){ console.log('Deleted successfully'); }}).then( () => { res.json({ status : 'Deleted!'}) })  
);

app.delete('/api/users/:id' , (req, res) =>  db.users.destroy({
    where: {   id: req.params.id    }
 }).then(function(rowDeleted){ 
   if(rowDeleted === 1){
      console.log('Deleted successfully');
    }}, function(err){ console.log(err); }).then( () => { res.json({ status : 'Deleted!'}) })  
);

app.delete('/api/failures/:id' , (req, res) =>  db.failures.destroy({
    where: {   id: req.params.id }
 }).then(function(rowDeleted){ 
   if(rowDeleted === 1){
      console.log('Deleted successfully');
    }}, function(err){console.log(err); }).then( () => { res.json({ status : 'Deleted!'}) })
);

app.delete('/api/technical_reviews/:id' , (req, res) =>  db.technical_reviews.destroy({
    where: {   id: req.params.id }
 }).then(function(rowDeleted){ 
   if(rowDeleted === 1){
      console.log('Deleted successfully');
    }}, function(err){console.log(err);  })  .then( () => { res.json({ status : 'Deleted!'}) }) 
);
app.delete('/api/vehicles/:id' , (req, res) =>  db.vehicles.destroy({
    where: {   id: req.params.id}
 }).then(function(rowDeleted){ 
   if(rowDeleted === 1){console.log('Deleted successfully');}}, function(err){console.log(err); 
}).then( () => { res.json({ status : 'Deleted!'}) })
);

// ****************************************** POST:
app.post('/api/users' , function(req, res)  {
    if ( !req.body.first_name )
        res.json({ error: 'Bad Data' })
    
    db.users.create(req.body).then( data => { res.send(data) });
});
app.post('/api/reviews' , function(req, res)  {
    if ( !req.body.state )
        res.json({ error: 'Bad Data' })
    
    db.technical_reviews.create(req.body).then( data => { res.send(data) });
});
app.post('/api/parts' , function(req, res)  {
    if ( !req.body.name)
        res.json({ error: 'Bad Data'})
    
    db.parts.create(req.body).then( data => { res.send(data) });
});
app.post('/api/vehicles' , function(req, res)  {
    if ( !req.body.owner_name )
        res.json({ error: 'Bad Data' })
    
    db.vehicles.create(req.body).then( data => { res.send(data) });
});
app.post('/api/failures' , function(req, res)  {
    if ( !req.body )
        res.json({ error:'Bad Data' })
    
    db.failures.create(req.body).then( data => { res.send(data) });
});

// ********************************************** PUT:
app.put('/api/vehicles/:id' , function(req, res)  {
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

app.put('/api/review/:id' , function(req, res)  {
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
    console.log('Server is working...');
});