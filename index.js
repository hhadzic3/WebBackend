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
app.get('/dijelovi', (req, res) => db.dijelovi.findAll().then(dijelovi => res.json(dijelovi)));
app.get('/korisnici', (req, res) => db.korisnici.findAll().then(korisnici => res.json(korisnici)));
app.get('/vozila', (req, res) => db.vozila.findAll().then(vozila => res.json(vozila)));
app.get('/tehnicki_pregledi', (req, res) => db.tehnicki_pregledi.findAll().then(tehnicki_pregledi => res.json(tehnicki_pregledi)));
app.get('/kvarovi', (req, res) => db.kvarovi.findAll().then(kvarovi => res.json(kvarovi)));
app.get('/tehnicki_pregledi/:id' , (req, res) =>  db.tehnicki_pregledi.finfOne({
    where: {   id: req.params.id }})   
);
app.get('/korisnici/:id' , (req, res) =>  db.korisnici.finfOne({
    where: {   id: req.params.id }})   
);

//  ****************************************** DELETE:
app.delete('/deleteDijelovi/:id' , (req, res) => db.dijelovi.destroy({
    where: {   id: req.params.id     }
 }).then(function(rowDeleted){ 
   if(rowDeleted === 1){ console.log('Deleted successfully'); }}).then( () => { res.json({ status : 'Deleted!'}) })  
);

app.delete('/deleteKorisnici/:id' , (req, res) =>  db.korisnici.destroy({
    where: {   id: req.params.id    }
 }).then(function(rowDeleted){ 
   if(rowDeleted === 1){
      console.log('Deleted successfully');
    }}, function(err){ console.log(err); }).then( () => { res.json({ status : 'Deleted!'}) })  
);

app.delete('/deleteKvarovi/:id' , (req, res) =>  db.kvarovi.destroy({
    where: {   id: req.params.id }
 }).then(function(rowDeleted){ 
   if(rowDeleted === 1){
      console.log('Deleted successfully');
    }}, function(err){console.log(err); }).then( () => { res.json({ status : 'Deleted!'}) })
);

app.delete('/deleteTehnicki_pregledi/:id' , (req, res) =>  db.tehnicki_pregledi.destroy({
    where: {   id: req.params.id }
 }).then(function(rowDeleted){ 
   if(rowDeleted === 1){
      console.log('Deleted successfully');
    }}, function(err){console.log(err);  })  .then( () => { res.json({ status : 'Deleted!'}) }) 
);
app.delete('/deleteVozila/:id' , (req, res) =>  db.vozila.destroy({
    where: {   id: req.params.id}
 }).then(function(rowDeleted){ 
   if(rowDeleted === 1){console.log('Deleted successfully');}}, function(err){console.log(err); 
}).then( () => { res.json({ status : 'Deleted!'}) })
);

// ****************************************** POST:
app.post('/addKorisnici' , function(req, res)  {
    if ( !req.body.naziv )
        res.json({ error: 'Bad Data' })
    
    db.korisnici.create(req.body).then( data => { res.send(data) });
});
app.post('/addPregledi' , function(req, res)  {
    if ( !req.body.stanje )
        res.json({ error: 'Bad Data' })
    
    db.tehnicki_pregledi.create(req.body).then( data => { res.send(data) });
});
app.post('/addDijelovi' , function(req, res)  {
    if ( !req.body.naziv )
        res.json({ error: 'Bad Data'})
    
    db.dijelovi.create(req.body).then( data => { res.send(data) });
});
app.post('/addVozila' , function(req, res)  {
    if ( !req.body.naziv_vlasnika )
        res.json({ error: 'Bad Data' })
    
    db.vozila.create(req.body).then( data => { res.send(data) });
});
app.post('/addKvarovi' , function(req, res)  {
    if ( !req.body )
        res.json({ error:'Bad Data' })
    
    db.kvarovi.create(req.body).then( data => { res.send(data) });
});

// ********************************************** PUT:
app.put('/editVozila/:id' , function(req, res)  {
    if ( !req.body.marka )
        res.json({ error: 'Bad Data' })
        
    var v = req.body;
    db.vozila.update( {
        naziv_vlasnika: v.naziv_vlasnika,
        marka: v.marka,
        tip: v.tip,
        serijski_broj: v.serijski_broj,
        godina_proizvodnje: v.godina_proizvodnje,
        datum_upotrebe: v.datum_upotrebe,
        prethodna_inspekcija: v.prethodna_inspekcija
    }, { where: { id: req.params.id } }
    ).then( () => { res.json({ status : 'Updated!'}) });
});

app.put('/editPregleda/:id' , function(req, res)  {
    if ( !req.body.stanje )
        res.json({ error: 'Bad Data' })
    
    var v = req.body;
    db.tehnicki_pregledi.update({
        stanje: v.stanje, vrsta: v.vrsta ,
        odgovorna_osoba:v.odgovorna_osoba,
        vozilo:v.vozilo
    }, { where: { id: req.params.id } }
    ).then( () => { res.json({ status : 'Updated!'}) });
});


module.exports = app.listen(8080, () => {
    console.log('Server radi...');
});