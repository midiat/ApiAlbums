'use strict'

const express = require('express');
const ImageController = require('../controllers/image');
const api = express.Router();

api.get('/pruebaImage', ImageController.pruebas);

module.exports = api;