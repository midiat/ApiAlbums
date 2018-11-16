import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ImageService } from '../services/image.service';
import { Image } from '../models/image';

@Component({
    selector: 'image-detail',
    templateUrl: '../views/image-detail.html',
    providers: [ImageService]
})


export class ImageDetailComponent implements OnInit{
   
    public image: Image;
    public api_url: string;
    public errorMessage: any;
    public loading: boolean;
    
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _imageService: ImageService
    ){}
    
    ngOnInit(){
        console.log('Image-detail.Component.ts cargado');
        this.api_url = this._imageService.getApiUrl('get-image/');
        this.getImage();
    }
    
    getImage(){
        
        this._route.params.forEach((params: Params) => {
            
            let id = params['id'];
            
            this._imageService.getImage(id).subscribe(
            result =>{
                this.image = result.image;
                
                if(!this.image){
                    this._router.navigate(['/']);
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
    
    public confirmado: any;
    
    onDeleteConfirm(id){
        this.confirmado = id;
    }
    
    onCancelImage(id){
        this.confirmado = null;
    }
    
    onDeleteImage(id){
        this._imageService.deleteImage(id).subscribe(
           result =>{
                
                if(!result.image){
                    alert('Error en el servidorxx');
                }
                
                //this.getImage();
                this._router.navigate(['/album', result.image.album]);
            },
            error => {
                this.errorMessage = <any>error;
                
                if(this.errorMessage != null){
                    console.log(this.errorMessage);
                }
            } 
        )
    }
}