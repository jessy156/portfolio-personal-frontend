import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
   url= "http://npinti.ddns.net:9008/api/auth/login";
   currentUserSubject:BehaviorSubject<any>;

  constructor( private httpClient: HttpClient) { 
    console.log('el servicio de auth esta corriendo');
    this.currentUserSubject= new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'))
  }

  iniciarSesion(credenciales:any):Observable<any>{
    return this.httpClient.post(this.url, credenciales).pipe(map(data =>{
      sessionStorage.setItem('currentUser', JSON.stringify(data));
      return data;
    }))
  }
}