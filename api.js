var express = require('express');
var router = express.Router();
const db = require('./db/db');

router.get('/', function (req, res) {
    var welcome ="<h1>Welcome to the server side!</h1>"  + "<h3>GET, POST, PUT, DELETE!</h3>" ;
    res.send(welcome + "<ul> <li> /user </li> <li> /vehicle </li> <li> /review </li> <li> /part </li> <li> /failure </li>  </ul>");
});

// ************************************ GET:
router.get('/part', (req, res) => db.parts.findAll().then(parts => res.json(parts)));
router.get('/user', (req, res) => db.users.findAll().then(users => res.json(users)));
router.get('/vehicle', (req, res) => db.vehicles.findAll().then(vehicles => res.json(vehicles)));
router.get('/review', (req, res) => db.technical_reviews.findAll().then(technical_reviews => res.json(technical_reviews)));
router.get('/failure', (req, res) => db.failures.findAll().then(failures => res.json(failures)));
router.get('/review/:id' , (req, res) =>  db.technical_reviews.findOne({
    where: {   id: req.params.id }}).then( data => { res.send(data) })   
);
router.get('/user/:id' , (req, res) =>  db.users.findOne({
    where: {   id: req.params.id }}).then( data => { res.send(data)})   
);
router.get('/vehicle/:id' , (req, res) =>  db.vehicles.findOne({
    where: {   id: req.params.id }}).then( data => { res.send(data)})   
);

router.get('/user/:user_name/:password' , (req, res) =>  db.users.findOne({
    where: {   user_name: req.params.user_name, password: req.params.password }}).then( data => { res.send(data)})
);

//  ****************************************** DELETE:
router.delete('/part/:id' , (req, res) => db.parts.destroy({
    where: {   id: req.params.id     }
 }).then( () => { res.json({ status : 'Deleted!'}) })  
);

router.delete('/user/:id' , (req, res) =>  db.users.destroy({
    where: {   id: req.params.id    }
 }).then( () => { res.json({ status : 'Deleted!'}) })  
);

router.delete('/failure/:id' , (req, res) =>  db.failures.destroy({
    where: {   id: req.params.id }
 }).then( () => { res.json({ status : 'Deleted!'}) })
);

router.delete('/review/:id' , (req, res) =>  db.technical_reviews.destroy({
    where: {   id: req.params.id }
 }).then( () => { res.json({ status : 'Deleted!'}) }) 
);
router.delete('/vehicle/:id' , (req, res) =>  db.vehicles.destroy({
    where: {   id: req.params.id}
 }).then( () => { res.json({ status : 'Deleted!'}) })
);

// ****************************************** POST:
router.post('/user' , function(req, res)  {
    if ( !req.body.user_name || !req.body.password )
        res.json({ error: 'Bad Data' })
    
    db.users.create(req.body)
    .then( data => { res.send(data) })
    .catch( function (err) {
        res.sendStatus(500)});
});
router.post('/review' , function(req, res)  {
    if ( !req.body.state )
        res.json({ error: 'Bad Data' })
    
    db.technical_reviews.create(req.body).then( data => { res.send(data) });
});
router.post('/part' , function(req, res)  {
    if ( !req.body.name)
        res.json({ error: 'Bad Data'})
    
    db.parts.create(req.body).then( data => { res.send(data) });
});
router.post('/vehicle' , function(req, res)  {
    if ( !req.body.owner_name )
        res.json({ error: 'Bad Data' })
    
    db.vehicles.create(req.body).then( data => { res.send(data) });
});
router.post('/failure' , function(req, res)  {
    if ( !req.body )
        res.json({ error:'Bad Data' })
    
    db.failures.create(req.body).then( data => { res.send(data) });
});

// ********************************************** PUT:
router.put('/vehicle/:id' , function(req, res)  {
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

router.put('/review/:id' , function(req, res)  {
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


module.exports = router;