import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getUserUrl : string = environment.baseUrl + "user/";
  loginUrl : string = environment.baseUrl + "User/login";
  registrationUrl : string = environment.baseUrl + "User/registration";

  constructor(private http : HttpClient) { }

  Register(data) : Observable<any>{
    return this.http.post<any>(this.registrationUrl, data);
  }

  Login(data) : Observable<any>{
    return this.http.post<any>(this.loginUrl, data);
  }

  GetUserById(id : Number) : Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.getToken()}`)
    return this.http.get(this.getUserUrl + id, {headers});
  }

  saveUser(data){
    localStorage.setItem('user', data);
  }

  getUser(){
    return localStorage.getItem('user');
  }

  saveToken(data){
    localStorage.setItem('token', data);
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
