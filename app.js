'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//carga de rutas
let album_routes = require('./routes/album');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//configurar cabeceras


//Rutas base
app.use('/api', album_routes);

module.exports = app;