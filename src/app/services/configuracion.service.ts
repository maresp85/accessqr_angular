import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  url: any;

  constructor(private http: HttpClient) { 
    this.url = environment.url;
  }

  getQuery(query: string) {
    const url = `${ this.url }/${ query }/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  

    return this.http.get(url, { headers });
  }

   //GET todos los códigos
  getCode() {    
    return this.getQuery('code');
  }

   //POST crear ordenes de trabajo
  postCode(qr: any) {
    const myObj = {
      "qr": qr
    };    
    const params = JSON.stringify(myObj);
    const url = `${ this.url }/code/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  

    return this.http.post(url, params, { headers });
  }

  //GET acceso de los usuarios
  getAccess() {    
    return this.getQuery('access');
  }

}
