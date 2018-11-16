import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlbumService } from '../services/album.service';
import { ImageService } from '../services/image.service';
import { Album } from '../models/album';
import { Image } from '../models/image';

@Component({
    selector: 'album-detail',
    templateUrl: '../views/album-detail.html',
    providers: [AlbumService, ImageService]
})


export class AlbumDetailComponent implements OnInit{
   
    public album: Album;
    public images: Image[];
    public api_url: string;
    public errorMessage: any;
    public loading: boolean;
    
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _albumService: AlbumService,
        private _imageService: ImageService
    ){}
    
    ngOnInit(){
        console.log('Album-detail.Component.ts cargado');
        this.api_url = this._imageService.getApiUrl('get-image/');
        //alert(this.api_url);
        
        this.getAlbum();
        //console.log(this.albums);
    }
    
    getAlbum(){
        
        this._route.params.forEach((params: Params) => {
            
            let id = params['id'];
            
            this._albumService.getAlbum(id).subscribe(
            result =>{
                this.album = result.album;
                
                if(!this.album){
                    this._router.navigate(['/']);
                }else{
                    //Llistar imagenes
                    this._imageService.getImages(result.album._id)
                        .subscribe(
                            response => {
                                this.images = response.images;
                                
                                if(!this.images){
                                    alert('Sin imagenes');
                                }
                            },
                            error => {
                                this.errorMessage = <any>error;
                
                                if(this.errorMessage != null){
                                    console.log(this.errorMessage);
                                    this._router.navigate(['/']);
                                    }
                            }
                    
                    );
                }
                
                this.loading = false;
            },
            error => {
                this.errorMessage = <any>error;
                
                if(this.errorMessage != null){
                    console.log(this.errorMessage);
                    this._router.navigate(['/']);
                }
            }
        );
        });
        
        
        
    }
}