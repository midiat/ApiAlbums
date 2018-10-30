'use strict'

const path = require('path');
const Image = require('../models/image');
const Album = require('../models/album');

function pruebas(req, res){
    res.status(200).send({message: 'Pruebas de controlador de imagenes'});
}


function getImage(req, res){
    let imageId=req.params.id;
    
    Image.findById(imageId, (err, image) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion!'});
        }else{
            if(!image){
                res.status(404).send({message: 'No existe la imagen!'});
            }else{
                
                Album.populate(image, {path: 'album'}, (err, image) => {
                     if(err){
                         res.status(500).send({message: 'Error en la peticion!'});
                     }else{
                         res.status(200).send({image});
                     }
                });
                
                
            }
            
        }
    });
    
}


function getImages(req, res){
    let albumId = req.params.album;
    
    if(!albumId){
        //Sacar todas las imagenes de DB
        var find = Image.find({}).sort('title');
        
    }else{
        //Sacar imagenes asociadas al album
        var find = Image.find({album: albumId }).sort('title');
    }
    
    find.exec((err, images) =>{
            if(err){
                res.status(500).send({message: 'Error en la peticion!'});
            }else{
                if(!images){
                    res.status(404).send({message: 'No hay imagenes en este album!'});
                }else{
                    Album.populate(images, {path: 'album'}, (err, images) => {
                         if(err){
                             res.status(500).send({message: 'Error en la peticion!'});
                         }else{
                             res.status(200).send({images});
                         }
                    });  
                }
            }
        });
}


function saveImage(req, res){
    let image= new Image();
    
    let params = req.body;
    image.title = params.title;
    image.picture = null;
    image.album = params.album;
    
    image.save((err, imageStored) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion!'});
        }else{
            if(!imageStored){
                res.status(404).send({message: 'No se ha guardado la imagen!'});
            }else{
                res.status(200).send({image: imageStored});
            }
        }
    });
    
}


function updateImage(req, res){
    let imageId = req.params.id;
    let update = req.body;
    
    Image.findByIdAndUpdate(imageId, update, (err, imageUpdated) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion!'});
        }else{
            if(!imageUpdated){
                res.status(404).send({message: 'No se ha actualizado la imagen!'});
            }else{
                res.status(200).send({image: imageUpdated});
            }
        }
    });
}

function deleteImage(req, res){
    let imageId = req.params.id;
    let update = req.body;
    
    Image.findByIdAndDelete(imageId, update, (err, imageRemoved) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion!'});
        }else{
            if(!imageRemoved){
                res.status(404).send({message: 'No se ha borrado la imagen!'});
            }else{
                res.status(200).send({image: imageRemoved});
            }
        }
    });
}

function uploadImage(req, res){
    let imageId = req.params.id;
    let file_name = 'No subido...';
    
    if(req.files){
        let file_path = req.files.image.path;
        let file_split = file_path.split('\\');
        file_name = file_split[1];
        
            Image.findByIdAndUpdate(imageId, {picture: file_name}, (err, imageUpdated) => {
                if(err){
                    res.status(500).send({message: 'Error en la peticion!'});
                }else{
                    if(!imageUpdated){
                        res.status(404).send({message: 'No se ha actualizado la imagen!'});
                    }else{
                        res.status(200).send({image: imageUpdated});
                    }
                }
            });
       
       }else{
           
           res.status(200).send({message: 'No ha subido ninguna imagen!'});
       }
    
    
}

var fs = require('fs');
function getImageFile(req, res){
    let imageFile = req.params.imageFile;
    
    fs.exists('./uploads'+imageFile, function(exists){
        if(exists){
            res.sendFile(path.resolve('./uploads/'+imageFile));
        }else{
           res.status(200).send({message: 'No existe la imagen'}); 
        }
    });
    res.status(200).send({message: 'No ha subido ninguna imagen!'}); 
    
}


module.exports = {
    pruebas,
    getImage,
    saveImage,
    getImages,
    updateImage,
    deleteImage,
    uploadImage,
    getImageFile
};