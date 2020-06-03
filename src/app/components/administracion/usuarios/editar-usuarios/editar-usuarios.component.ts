import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-editar-usuarios',
  templateUrl: './editar-usuarios.component.html',
  styleUrls: []
})
export class EditarUsuariosComponent implements OnInit {

  title: string = "Editar Usuario";
  breadcrumbtitle: string = "Configuración";
  breadcrumbtitle2: string = "Usuarios";
  usuario: UsuarioModel;
  loadingButton: boolean = false;
  listado: any = [];
  loading: boolean = false;  
  email: any;
  options: any = ["1", "0"]; 
  estado: any;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private _usService: UsuarioService) {
    this.usuario = new UsuarioModel();
    this.activatedRoute.params.subscribe(params => {
      this.email = params['email']; 
    });  
  }

  ngOnInit() {
    this.loading = true;
    this._usService.getUsuarioEmail(this.email)
                    .subscribe((res: any) => {    
                        this.loading = false; 
                        this.listado = res['usuarioDB'];  
                        this.usuario._id = this.listado._id;
                        this.usuario.nombre = this.listado.nombre;
                        this.usuario.email = this.listado.email;                 
                        this.estado = this.listado.estado ? '1' : '0';
                    }, error => {
                      this.error();
                    });
  }  

  onSubmit(form: NgForm) {   
  
    if (form.invalid) { return; }

    this.loadingButton = true;    
    this._usService.putUsuario(this.usuario._id,
                               this.usuario.nombre,
                               this.usuario.estado)
                    .subscribe((res: any) => { 
                      if (res.ok == true) {
                        this.loadingButton = false;    
                        Swal.fire({    
                          text: 'Usuario editado',
                          icon: 'success',
                          confirmButtonText: 'OK',
                          allowOutsideClick: false
                        }).then((result) => {
                          this.loadingButton = false;
                          this.router.navigate(['/listarusuarios']);
                        });                  
                      } else {
                        this.error();
                      }         
                    }, error => {
                      this.error();
                    });    
    
  }

  error() {
    this.loadingButton = false;
    Swal.fire({    
      text: 'Ocurrió un error, contacte al administrador',
      icon: 'error',
      confirmButtonText: 'OK',
      allowOutsideClick: false
    });                    
  }
}
