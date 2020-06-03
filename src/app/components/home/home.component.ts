import { Component, OnInit } from '@angular/core';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit {

  loading: boolean = false;
  estado1: any;
  estado2: any;
  estado3: any;
  estado4: any;

  constructor(private _orService: OrdenesService,
              private _usService: UsuarioService) { }

  ngOnInit() {
    this.loading = true;
    let empresa: any = this._usService.leerEmpresaUsuario();
    this._orService.getOrdenesConteoEstado(empresa)
                   .subscribe((res: any) => {  
                      this.loading = false;           
                      this.estado1 = res.conteo[0];             
                      this.estado2 = res.conteo[1];             
                      this.estado3 = res.conteo[2];             
                      this.estado4 = res.conteo[3];             
                   }, error => { this.loading = false }); 
  }

}
