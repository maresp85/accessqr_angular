import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit {

  title: string = "Registro de Personal";
  breadcrumbtitle: string = "Listado";
  breadcrumbtitle2: string = "Acceso";
  loading: boolean = false;
  listado: any = [];

  constructor(private _conService: ConfiguracionService,
              private _usService: UsuarioService) { }

  ngOnInit() {
    this.loading = true;
    this._conService.getAccess()
                    .subscribe((res: any) => {        
                      this.loading = false;  
                      this.listado = res['accessDB'];     
                    }, error => {
                      this.error();
                    });   
  }

  error() {
    this.loading = false;   
    Swal.fire({    
      text: 'Ocurrió un error, intente de nuevo',
      icon: 'error',
      confirmButtonText: 'OK',
      allowOutsideClick: false
    });                    
  }

}
