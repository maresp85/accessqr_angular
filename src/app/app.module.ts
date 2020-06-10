import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { QRCodeModule } from 'angularx-qrcode';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';

//Fechas
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePy from '@angular/common/locales/es-PY';
import localeEsCo from '@angular/common/locales/es-CO'; 
registerLocaleData(localePy, 'es');
registerLocaleData(localeEsCo, 'es-Co');

//Rutas
import { ROUTES } from "./app.routes";
//Servicios
import { UsuarioService } from './services/usuario.service';
import { ConfiguracionService } from './services/configuracion.service';
//Componentes shared
import { LoadingComponent } from './shared/loading/loading.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { TitleComponent } from './shared/title/title.component';
//Componentes
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
//Componentes administración
import { ListarUsuariosComponent } from './components/administracion/usuarios/listar-usuarios/listar-usuarios.component';
//Componentes configuración
import { ListarCodigoComponent } from './components/configuracion/codigos/listar-codigos/listar-codigo.component';


@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    NavbarComponent,
    SidebarComponent,
    TitleComponent,    
    HomeComponent,    
    LoginComponent,
    ListarCodigoComponent,
    ListarUsuariosComponent,    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule,
    QRCodeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot( ROUTES, { useHash: true } )
  ],
  providers: [UsuarioService, 
              ConfiguracionService,
              { provide: LOCALE_ID, useValue: "es" },
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
