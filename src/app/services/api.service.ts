import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //se importa el servicio y se inyecta en la clase como una dependencia a travez del constructor 

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //url: string = 'http://localhost:3000';
  url: string = 'https://contableag.site';


  constructor(public http: HttpClient) { }

  post(path: string, body: any) {
    return this.http.post(this.url + '/' + path, body);
  };

}
