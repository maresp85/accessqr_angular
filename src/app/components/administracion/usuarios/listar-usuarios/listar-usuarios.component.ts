import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: []
})
export class ListarUsuariosComponent implements OnInit {

  title: string = "Usuarios";
  breadcrumbtitle: string = "Administración";
  breadcrumbtitle2: string = "Usuarios";
  listado: any = [];
  loading: boolean = false;
  url: any = environment.url + "/uploads/usuarios/firmas/";

  constructor(public _usService: UsuarioService) {
   
  }

  ngOnInit() {
    this.loading = true;
    this._usService.getUsuarios()
                    .subscribe((res: any) => {        
                        this.loading = false;  
                        console.log(res);
                        this.listado = res['usersDB'];     
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
