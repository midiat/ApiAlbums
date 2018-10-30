'use strict'

const express = require('express');
const ImageController = require('../controllers/image');
const api = express.Router();
const multipart = require('connect-multiparty');

let multipartMiddle = multipart({uploadDir: './uploads'});


api.get('/pruebaImage', ImageController.pruebas);
api.get('/image/:id', ImageController.getImage);
api.get('/images/:album?', ImageController.getImages);
api.post('/image', ImageController.saveImage);
api.put('/image/:id', ImageController.updateImage);
api.delete('/image/:id', ImageController.deleteImage);
api.post('/upload-image/:id', multipartMiddle, ImageController.uploadImage);
api.get('/get-image/:imageFile', multipartMiddle, ImageController.getImageFile);


module.exports = api;