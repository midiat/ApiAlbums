import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
//import 'rxjs/add/operator/map';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Image} from '../models/image';
import {GLOBAL} from './global';

@Injectable()
export class ImageService{
    public url: string;
    
    constructor(private _http: Http){
        this.url = GLOBAL.url;
    }
    
    getImages(albumId = null){
        if(albumId == null){
            return this._http.get(this.url+'images')
                            .pipe(map(res => res.json()));
        }else{
            return this._http.get(this.url+'images/'+albumId)
                            .pipe(map(res => res.json()));
        }
    }
    
    getImage(id){
        return this._http.get(this.url+'image/'+id)
                            .pipe(map(res => res.json()));
    }
    
    addImage(image: Image){
        let json = JSON.stringify(image);
        let params = json;
        let headers = new Headers({'Content-Type':'application/json'});
        
        return this._http.post(this.url+'image', params, {headers: headers})
                         .pipe(map(res => res.json()));
    }
    
    editImage(id: string, image: Image){
        let json = JSON.stringify(image);
        let params = json;
        let headers = new Headers({'Content-Type':'application/json'});
        
        return this._http.put(this.url+'image/'+id, params, {headers: headers})
                         .pipe(map(res => res.json()));
    }
    
    deleteImage(id:string){
        return this._http.delete(this.url+'image/'+id)
                            .pipe(map(res => res.json()));
    }
}