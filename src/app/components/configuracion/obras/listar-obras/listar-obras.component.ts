import { Component, OnInit } from '@angular/core';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-obras',
  templateUrl: './listar-obras.component.html',
  styleUrls: []
})
export class ListarObrasComponent implements OnInit {

  title: string = "Código QRjj";
  breadcrumbtitle: string = "Configuración";
  breadcrumbtitle2: string = "Código QR";
  listado: any = [];
  loading: boolean = false;

  constructor(private _conService: ConfiguracionService,
              private _usService: UsuarioService) { }

  ngOnInit() {

    this.loading = true;
    let empresa: any = this._usService.leerEmpresaUsuario();
    this._conService.getObra(empresa)
                    .subscribe((res: any) => {    
                      this.loading = false;        
                      this.listado = res['obraDB'];     
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
