import { Component, OnInit } from '@angular/core';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-codigo',
  templateUrl: './listar-codigo.component.html',
  styleUrls: []
})
export class ListarCodigoComponent implements OnInit {

  title: string = "Código QR";
  breadcrumbtitle: string = "Configuración";
  breadcrumbtitle2: string = "Código QR";
  listado: any = [];
  loading: boolean = false;
  loadingButton: boolean = false;
  passcode: any = "PRUEBA";
  p: number = 1;
  

  constructor(private _conService: ConfiguracionService,
              private _usService: UsuarioService) { }

  ngOnInit() {
    this.getCode();
  }

  getCode() {
    this.loading = true;
    this._conService.getCode()
                    .subscribe((res: any) => {        
                      this.loading = false;  
                      this.listado = res['codeDB'];     
                    }, error => {
                      this.error();
                    });
  }

  generarCodigo() {
    this.loading = true;
    this.passcode = this.generatePasswordRand(10,'rand');
    this._conService.postCode(this.passcode)
                    .subscribe((res: any) => {
                      this.getCode();
                    }, error => {
                      this.error();
                    });
  }

  generatePasswordRand(length,type) {

    var characters;

    switch(type) {
      case 'num':
          characters = "0123456789";
          break;
      case 'alf':
          characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
      case 'rand':
          //FOR ↓
          break;
      default:
          characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
          break;
    }
    var pass = "";
    for (var i=0; i < length; i++) {
      if (type == 'rand'){
          pass += String.fromCharCode((Math.floor((Math.random() * 100)) % 94) + 33);
      } else {
          pass += characters.charAt(Math.floor(Math.random()*characters.length));   
      }
    }
    return pass;
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
