'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 8083;

mongoose.connect('mongodb://localhost:27017/apialbums',{ useNewUrlParser: true,useCreateIndex: true }, (err,res)=>{
    
    if(err){
        throw err;
    }else{
        console.log('Base de datos online...');
        
        app.listen(port, ()=>{
            console.log('ApiAlbums online... ');
        });
        
    }
    

});
