import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {

  url: any;

  constructor(private http: HttpClient) { 
    this.url = environment.url;
  }

  getQuery(query: string) {
    const url = `${ this.url }/${ query }/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  

    return this.http.get(url, { headers });
  }

   // GET todas las ordenes de trabajo
  getOrdenes(empresa: any) {    
    return this.getQuery(`ordentrabajo/listar/${ empresa }`);
  }

  // GET todas las ordenes de trabajo
  getOrdenesUsuario(usuario: any) {    
    return this.getQuery(`ordentrabajo/listarusuario/${ usuario }`);
  }

   // GET ordenes de trabajo por estado (conteo)
  getOrdenesConteoEstado(empresa: any) {    
    return this.getQuery(`ordentrabajo/contarestado/${ empresa }`);
  }

  getUnaOrden(_id: any) {    
    return this.getQuery(`ordentrabajo/listaruna/${ _id }`);
  }

   // POST crear ordenes de trabajo
  crearOrdenes(empresa: any,                
               trabajo: any,
               obra: any, 
               usuario: any, 
               fecha: any,
               observaciones: string) {
    const myObj = {
      "empresa": empresa,      
      "trabajo": trabajo,
      "obra": obra,
      "usuario": usuario,
      "fecha": fecha,
      "observaciones": observaciones
    };    
    const params = JSON.stringify(myObj);
    const url = `${ this.url }/ordentrabajo/crear/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  

    return this.http.post(url, params, { headers });
  }

   // GET ordenes tipo trabajo
  getOrdenesTipo(ordentrabajo: any) {    
    return this.getQuery(`ordentipotrabajo/listar/${ ordentrabajo }`);
  }

   // GET ordenes actividades x orden de trabajo x estado
  getOrdenesActividades(ordentrabajo: any, activo: any) {    
    return this.getQuery(`ordenactividad/listar/${ ordentrabajo }/${ activo }`);
  }

  // GET ordenes actividades x tipo de trabajo x actividad
  getOrActividadesOrTipoTrabajo(actividad: any, ordentipotrabajo: any) {
    return this.getQuery(`ordenactividad/listarordentipotrabajo/${ actividad }/${ ordentipotrabajo }`);
  }
  
   // GET orden actividad x id
  getUnaOrdenActividad(id: any) {    
    return this.getQuery(`ordenactividad/listaruna/${ id }`);
  }

    // GET items de actividades
  getItemsActividad(actividad: any) {    
    return this.getQuery(`itemactividad/listar/${ actividad }`);
  }

    // GET todos items de actividades 
  getItemsActividadTodos() {    
    return this.getQuery(`itemactividad/listartodos`);
  }

    // GET items de actividades x cumplimiento
  getItemsActividadEstado(actividad: any, cumple: any) {    
    return this.getQuery(`itemactividad/listarcumple/${ actividad }/${ cumple }`);
  }

    // PUT actualizar id viga orden trabajo
  putIdVigaOrdenTrabajo(_id: any, 
                        idviga: any) {
    const myObj = {
      "idviga": idviga
    };    
    const params = JSON.stringify(myObj);
    const url = `${ this.url }/ordentrabajo/idviga/${ _id }`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  

    return this.http.put(url, params, { headers });
  }

    // PUT actualizar estado orden actividad
  putEstadoOrdenActividad(_id: any, 
                          estado: any,
                          usuario: any,
                          files: Array<File>,
                          observacion: any) {

    (estado == 1) ? estado = "CUMPLE" : estado = "NO CUMPLE";
    var fechalegaliza: any = Date.now();

    const params = new FormData();
    params.append("estado", estado);
    params.append("usuariolegaliza", usuario);
    params.append("fechalegaliza", fechalegaliza);    
    params.append("observacion", observacion);
    for (let i=0; i < files.length; i++) {
      params.append("uploads[]", files[i], Date.now() + files[i]['name']);
    } 
 
    const url = `${ this.url }/ordenactividad/editar/${ _id }`; 

    return this.http.put(url, params);
  }

    // PUT actualizar estado orden actividad
  putInactivaOrdenActividad(_id: any) {
   
    const myObj = {
      "activo": 0
    };    
    const params = JSON.stringify(myObj);
    const url = `${ this.url }/ordenactividad/inactivar/${ _id }`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  

    return this.http.put(url, params, { headers })
  }

   // GET imagenes ordenes de actividades
  getImgOrdenActividad(ordenactividad: any) {    
    return this.getQuery(`imgordenactividad/listar/${ ordenactividad }`);
  }

   // GET imagenes ordenes de trabajo
  getImgOrdenTrabajo(ordentrabajo: any) {    
    return this.getQuery(`imgordenactividad/listartodas/${ ordentrabajo }`);
  }
  
}
