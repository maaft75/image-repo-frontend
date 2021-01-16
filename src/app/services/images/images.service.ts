import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private imageUrl : string = environment.baseUrl + "image";
  private userImageUrl : string = environment.baseUrl + "image/user/";

  constructor(private auth : AuthService, private http : HttpClient) { }

  AddImage(data) : Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.getToken())
    return this.http.post<any>(this.imageUrl, data, {headers});
  }

  GetImages() : Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.getToken())
    return this.http.get<any>(this.imageUrl, {headers});
  }

  GetImage(id : Number) : Observable<any> {
    return this.http.get(this.imageUrl + "/" + id)
  }

  GetImagesFromUser(id : Number) : Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.getToken());
    return this.http.get(this.userImageUrl + id, {headers})
  }

  DeleteImage(id : Number) : Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.getToken());
    return this.http.delete(this.imageUrl + "/" + id, {headers})
  }

  getToken() : string {
    return `Bearer ${this.auth.getToken()}`;
  }
}