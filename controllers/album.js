'use strict'

const Album = require('../models/album');

function getAlbum(req, res) {

    let albumId = req.params.id;

    Album.findById(albumId, (err, album) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la peticion'
            });

        } else {
            if (!album) {
                res.status(404).send({
                    message: 'El album no existe'
                });
            } else {
                res.status(200).send({
                    album
                });
            }
        }
    });

}


function getAlbums(req, res) {

    Album.find({}, (err, albums) => {
        if (err) {
            res.status(500).send({message: 'Error en la peticion'});

        } else {
            if (!albums) {
                res.status(404).send({message: 'No hay albums'});
            } else {
                res.status(200).send({album: albums});
            }
        }
    });

}

function saveAlbum(req, res){
    let album = new Album;
    
    let params = req.body;
    album.title =params.title;
    album.description=params.description;
    
    album.save((err, albumStored)=>{
        if(err){
            res.status(500).send({message: 'Error al guardar el album'});
           }else{
               if (!albumStored) {
                res.status(404).send({message: 'No se ha guardado el album'});
            } else {
                res.status(200).send({album: albumStored});
            }
               
           }
        
    });
    
}


function updateAlbum(req, res){
    let albumId=req.params.id;
    let update=req.body;
    
    Album.findByIdAndUpdate(albumId, update, (err, albumUpdated)=>{
        if(err){
            res.status(500).send({message: 'Error al actualizar el album'});
        }else{
            if (!albumUpdated) {
                res.status(404).send({message: 'No se ha actualizado el album'});
            } else {
                res.status(200).send({album: albumUpdated});
            }
        }
        
    } );
    
}


function deleteAlbum(req, res){
    let albumId=req.params.id;
    
    Album.findByIdAndRemove(albumId, (err, albumRemoved)=>{
        if(err){
            res.status(500).send({message: 'Error al borrar el album'});
        }else{
            if (!albumRemoved) {
                res.status(404).send({message: 'No se ha borrado el album'});
            } else {
                res.status(200).send({album: albumRemoved});
            }
        }
        
    } );
    
}



/////////////
module.exports = {
    getAlbum,
    getAlbums,
    saveAlbum,
    updateAlbum,
    deleteAlbum
};
