import { Component, OnInit } from '@angular/core';
import { ObraModel } from 'src/app/models/obra.model';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-obras',
  templateUrl: './crear-obras.component.html',
  styleUrls: []
})

export class CrearObrasComponent implements OnInit {
 
  title: string = "Obras";
  breadcrumbtitle: string = "Configuración";
  breadcrumbtitle2: string = "Obras";
  obra: ObraModel;
  loadingButton: boolean = false;

  constructor(private router: Router,
              private _conService: ConfiguracionService,
              private _usService: UsuarioService) {
    this.obra = new ObraModel();
  }

  ngOnInit() {
  }  

  onSubmit(form: NgForm) {   
  
    if (form.invalid) { return; }

    this.loadingButton = true;

    let empresa: any = this._usService.leerEmpresaUsuario();
     
    this._conService.crearObra(this.obra.nombre,
                               this.obra.direccion,
                               empresa)
                    .subscribe((res: any) => { 
                      if (res.ok == true) {
                        Swal.fire({    
                          text: 'Obra creada',
                          icon: 'success',
                          confirmButtonText: 'OK',
                          allowOutsideClick: false
                        }).then((result) => {
                          this.loadingButton = false;
                          this.router.navigate(['/listarobras']);
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
      text: 'Ocurrió un error, intente de nuevo',
      icon: 'error',
      confirmButtonText: 'OK',
      allowOutsideClick: false
    });                    
  }

}
