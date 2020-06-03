import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: []
})
export class CrearUsuariosComponent implements OnInit {

  title: string = "Crear nuevo usuario";
  breadcrumbtitle: string = "Administración";
  breadcrumbtitle2: string = "Usuarios";
  usuario: UsuarioModel;
  loadingButton: boolean = false;
  loading: boolean = false;
  listadoEmpresa: any = [];
  signImg: File = null;
  existsFile: boolean = false;
  empresa: any;

  constructor(private router: Router,
              private _conService: ConfiguracionService,
              private _usService: UsuarioService) {
    this.usuario = new UsuarioModel();
  }

  ngOnInit() {
    this.loading = true;
    this._conService.getEmpresa()
                    .subscribe( res => {    
                        this.loading = false;        
                        this.listadoEmpresa = res['empresaDB'];     
                    }, error => {
                      console.log(error)
                    });
  }  

   // Cargue de imágenes
  signUpload(fileInput: any) {
    this.signImg = <File>fileInput.target.files[0];    
  } 

  onSubmit(form: NgForm) {   
  
    if (form.invalid) { return; }

    if (this.signImg == null) {
      this.existsFile = true;
      return;
    } else {
      this.existsFile = false;      
    }

    this.loadingButton = true;    
    this._usService.crearUsuario(this.usuario.nombre,
                                 this.usuario.password,
                                 this.usuario.email, 
                                 this.usuario.role,
                                 this.usuario.empresa,
                                 this.signImg)
                    .subscribe((res: any) => { 
                      if (res.ok == true) {
                        this.loadingButton = false;
                        Swal.fire({    
                          text: 'Usuario creado',
                          icon: 'success',
                          confirmButtonText: 'OK',
                          allowOutsideClick: false
                        }).then((result) => {                          
                          this.router.navigate(['/listarusuarios']);
                        });                  
                      } else {
                        this.error("Ocurrió un error. Intente de nuevo");
                      }         
                    }, (error: any) => {
                      this.error(error.error.err.errors.email.message);
                    }); 
  }

  error(txt: string) {
    this.loadingButton = false;
    Swal.fire({    
      text: txt,
      icon: 'error',
      confirmButtonText: 'OK',
      allowOutsideClick: false
    });                    
  }
}
