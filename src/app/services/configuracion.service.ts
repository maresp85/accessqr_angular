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

  //GET todas las empresas
  getEmpresa() {    
    return this.getQuery('empresa/listar');
  }

   // POST crear empresas
  crearEmpresa(nombre: any, ubicacion: any, telefono: Number, activo: any) {
    const myObj = {
      "nombre": nombre,
      "ubicacion": ubicacion,
      "telefono": telefono,
      "activo": activo
    };    
    const params = JSON.stringify(myObj);
    const url = `${ this.url }/empresa/crear/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  

    return this.http.post(url, params, { headers });
  }

   // GET trabajos
  getTrabajo(empresa: any) {    
    return this.getQuery(`trabajo/listar/${ empresa }`);
  }

   // POST crear trabajos
  crearTrabajo(nombre: any, empresa: any) {
    const myObj = {
      "nombre": nombre,
      "empresa": empresa
    };    
    const params = JSON.stringify(myObj);
    const url = `${ this.url }/trabajo/crear/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  

    return this.http.post(url, params, { headers });
  }

   // GET Obras
  getObra(empresa: any) {    
    return this.getQuery(`obra/listar/${ empresa }`);
  }

   // POST crear Obras
  crearObra(nombre: any, direccion: any, empresa: any) {
    const myObj = {
      "nombre": nombre,
      "direccion": direccion,
      "empresa": empresa
    };    
    const params = JSON.stringify(myObj);
    const url = `${ this.url }/obra/crear/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  

    return this.http.post(url, params, { headers });
  }

   // GET tipos de trabajo
  getTipoTrabajo(empresa: any) {    
    return this.getQuery(`tipotrabajo/listar/${ empresa }`);
  }

  // GET actividad x id
  getUnTipoTrabajo(id: any) {    
    return this.getQuery(`tipotrabajo/listaruno/${ id }`);
  }

   // POST crear tipos de trabajos
  crearTipoTrabajo(nombre: any, trabajo: any, empresa: any) {
    const myObj = {
      "nombre": nombre,
      "trabajo": trabajo,
      "empresa": empresa
    };    
    const params = JSON.stringify(myObj);
    const url = `${ this.url }/tipotrabajo/crear/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  

    return this.http.post(url, params, { headers });
  }  

   // GET actividades x empresa
  getActividad(empresa: any) {    
    return this.getQuery(`actividad/listar/${ empresa }`);
  }

   // GET actividad x id
  getUnaActividad(id: any) {    
    return this.getQuery(`actividad/listaruna/${ id }`);
  }

   // POST crear actividades
  crearActividad(nombre: any, tipotrabajo: any) {
    const myObj = {
      "nombre": nombre,
      "tipotrabajo": tipotrabajo
    };    
    const params = JSON.stringify(myObj);
    const url = `${ this.url }/actividad/crear/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  

    return this.http.post(url, params, { headers });
  }

   // GET items de actividades
  getItemsActividad(actividad: any) {    
    return this.getQuery(`itemactividad/listar/${ actividad }`);
  }

    // GET un item actividad
  getUnItemActividad(id: any) {    
    return this.getQuery(`itemactividad/listaruna/${ id }`);
  }

    // PUT excluyente orden de trabajo
  putItemActividad(_id: any,
                   cumple: any,
                   tipo: any,
                   etiqueta: any,
                   imagen: any,
                   activo: any) {
    const myObj = {
      "cumple": cumple,
      "tipo": tipo,
      "etiqueta": etiqueta,
      "imagen": imagen,
      "activo": activo
    };    
    const params = JSON.stringify(myObj);
    const url = `${ this.url }/itemactividad/editar/${ _id }`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  

    return this.http.put(url, params, { headers });
  }

   // POST crear actividades
  crearItemActividad(empresa: any,
                     actividad: any,
                     cumple: boolean,
                     tipo: string,
                     etiqueta: any,
                     imagen: boolean) {
    const myObj = {
      "empresa": empresa,
      "actividad": actividad,
      "cumple": cumple,
      "tipo": tipo,
      "etiqueta": etiqueta,
      "imagen": imagen
    };    
    const params = JSON.stringify(myObj);
    const url = `${ this.url }/itemactividad/crear/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  

    return this.http.post(url, params, { headers });
  }

  //////////////////////////////////////////////////////////////////////////////////  
  //GET campos ordenes
  getCamposOrdenes(tipoordenes_id: any, empresas_id: any) {    
    return this.getQuery(`camposordenes/listar/${tipoordenes_id}/${empresas_id}`);
  }

  //POST crear ordenes de trabajo
  crearCamposOrdenes(tipoordenes_id: any, 
                     empresas_id: any,
                     name: any,
                     label: any,
                     placeholder: any,
                     type: any,
                     length: any) {
    const myObj = {
      "tipoordenes": tipoordenes_id,
      "empresas": empresas_id,
      "name": name,
      "label": label,
      "placeholder": placeholder,
      "type": type,
      "length": length
    };    
    const params = JSON.stringify(myObj);
    const url = `${ this.url }/camposordenes/crear/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  

    return this.http.post(url, params, { headers });
  }

    // PUT excluyente orden de trabajo
  putTipoTrabajo(_id: any,
                 nombre: any,
                 excluyente: any,
                 activo: any) {
    const myObj = {
      "nombre": nombre,
      "excluyente": excluyente,
      "activo": activo
    };    
    const params = JSON.stringify(myObj);
    const url = `${ this.url }/tipotrabajo/editar/${ _id }`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  

    return this.http.put(url, params, { headers });
  }

}
