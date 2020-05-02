const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var api = require('./api.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', api);

module.exports = app.listen(8080, () => {
    console.log('Server is working...');
});