'use strict'
/////////

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//carga de rutas
let album_routes = require('./routes/album');
let image_routes = require('./routes/image');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//configurar cabeceras


//Rutas base
app.use('/api', album_routes);
app.use('/api', image_routes);

module.exports = app;