const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var api = require('./api.js');
const db = require('./init.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var cors = require('cors')

app.use(cors()) 
app.use('/api', api);

module.exports = app.listen(process.env.PORT || 8080, () => {
	db.initialize();
    console.log('Server is working on http://localhost:8080/api');
});