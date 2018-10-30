import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'album-list',
    templateUrl: '../views/albums-list.html'
})


export class AlbumsListComponent implements OnInit{
    public titulo: string;
    
    ngOnInit(){
        this.titulo= "Listado de albums";
        console.log('Albums-list.Component.ts cargado');
    }
}