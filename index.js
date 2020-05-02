const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/db');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api', function (req, res) {
    var welcome ="<h1>Welcome to the server side!</h1>"  + "<h3>GET, POST, PUT, DELETE!</h3>" ;
    res.send(welcome + "<ul> <li> /user </li> <li> /vehicle </li> <li> /review </li> <li> /part </li> <li> /failure </li>  </ul>");
});

// ************************************ GET:
app.get('/api/part', (req, res) => db.parts.findAll().then(parts => res.json(parts)));
app.get('/api/user', (req, res) => db.users.findAll().then(users => res.json(users)));
app.get('/api/vehicle', (req, res) => db.vehicles.findAll().then(vehicles => res.json(vehicles)));
app.get('/api/review', (req, res) => db.technical_reviews.findAll().then(technical_reviews => res.json(technical_reviews)));
app.get('/api/failure', (req, res) => db.failures.findAll().then(failures => res.json(failures)));
app.get('/api/review/:id' , (req, res) =>  db.technical_reviews.finfOne({
    where: {   id: req.params.id }})   
);
app.get('/api/user/:id' , (req, res) =>  db.users.finfOne({
    where: {   id: req.params.id }})   
);

//  ****************************************** DELETE:
app.delete('/api/part/:id' , (req, res) => db.parts.destroy({
    where: {   id: req.params.id     }
 }).then(function(rowDeleted){ 
   if(rowDeleted === 1){ console.log('Deleted successfully'); }}).then( () => { res.json({ status : 'Deleted!'}) })  
);

app.delete('/api/user/:id' , (req, res) =>  db.users.destroy({
    where: {   id: req.params.id    }
 }).then(function(rowDeleted){ 
   if(rowDeleted === 1){
      console.log('Deleted successfully');
    }}, function(err){ console.log(err); }).then( () => { res.json({ status : 'Deleted!'}) })  
);

app.delete('/api/failure/:id' , (req, res) =>  db.failures.destroy({
    where: {   id: req.params.id }
 }).then(function(rowDeleted){ 
   if(rowDeleted === 1){
      console.log('Deleted successfully');
    }}, function(err){console.log(err); }).then( () => { res.json({ status : 'Deleted!'}) })
);

app.delete('/api/review/:id' , (req, res) =>  db.technical_reviews.destroy({
    where: {   id: req.params.id }
 }).then(function(rowDeleted){ 
   if(rowDeleted === 1){
      console.log('Deleted successfully');
    }}, function(err){console.log(err);  })  .then( () => { res.json({ status : 'Deleted!'}) }) 
);
app.delete('/api/vehicle/:id' , (req, res) =>  db.vehicles.destroy({
    where: {   id: req.params.id}
 }).then(function(rowDeleted){ 
   if(rowDeleted === 1){console.log('Deleted successfully');}}, function(err){console.log(err); 
}).then( () => { res.json({ status : 'Deleted!'}) })
);

// ****************************************** POST:
app.post('/api/user' , function(req, res)  {
    if ( !req.body.user_name || !req.body.password )
        res.json({ error: 'Bad Data' })
    
    db.users.create(req.body).then( data => { res.send(data) });
});
app.post('/api/review' , function(req, res)  {
    if ( !req.body.state )
        res.json({ error: 'Bad Data' })
    
    db.technical_reviews.create(req.body).then( data => { res.send(data) });
});
app.post('/api/part' , function(req, res)  {
    if ( !req.body.name)
        res.json({ error: 'Bad Data'})
    
    db.parts.create(req.body).then( data => { res.send(data) });
});
app.post('/api/vehicle' , function(req, res)  {
    if ( !req.body.owner_name )
        res.json({ error: 'Bad Data' })
    
    db.vehicles.create(req.body).then( data => { res.send(data) });
});
app.post('/api/failure' , function(req, res)  {
    if ( !req.body )
        res.json({ error:'Bad Data' })
    
    db.failures.create(req.body).then( data => { res.send(data) });
});

// ********************************************** PUT:
app.put('/api/vehicle/:id' , function(req, res)  {
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